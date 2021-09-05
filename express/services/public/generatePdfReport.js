const Service = require('../Service');
const models = require('../../models/index');
const pdfHandler = require('../../handlers/report/pdf');
const CalculationClasses = require('../../classes/index');

const PDF_TEMPLATE_FILE_PATH = 'handlers/report/pdf/template/pdf-report.html';

/**
 * Get the binary PDF file
 * Get the binary PDF file
 *
 * req InlineObject  (optional)
 * returns File
 * */
const generatePdfReport = (req) =>
  new Promise(async (resolve, reject) => {
    try {
      let answeredQuestions = {};
      let results = [];
      let hasValidationError = false;
      let validationErrorMsg = '';

      if (
        req.body &&
        req.body.answers &&
        req.body.answers.Questions &&
        req.body.answers.Questions.length > 0
      ) {
        answeredQuestions = req.body.answers.Questions || {};
      }

      if (req.body && req.body.results && req.body.results.length > 0) {
        results = req.body.results || [];
      }

      if (!answeredQuestions || !results) {
        hasValidationError = true;
        validationErrorMsg = 'Invalid input.';
      }

      // Get the categories from DB.
      const conn = await models.connectDb();
      const categoryModel = await conn.models.Category.find().exec();

      // Convert the categories to array: ["PatchOS","MFA","Backups",...]
      const categories = categoryModel.map((c) => c.QuestionCategory);

      const categorisedAnsweredQuestions = categories
        .map((c) => answeredQuestions.filter((aq) => c === aq.QuestionCategory))
        .filter((e) => e.length > 0);

      if (categorisedAnsweredQuestions.length !== results.length) {
        hasValidationError = true;
        validationErrorMsg = 'Mismatched answers and mitigation level results.';
      }

      const templateVariables = categorisedAnsweredQuestions.map((c) => {
        const QuestionAnswered = CalculationClasses.QuestionAnswered;
        // {string} category QuestionCategory string value
        let category;

        // {CalculationClasses.QuestionAnswered[]} questionsAnswered Convert questions to QuestionAnswered array.
        const questionsAnswered = c.map((q) => {
          category = q.QuestionCategory;
          const qa = new QuestionAnswered(
            q.QuestionCategory,
            q.QuestionType,
            q.Mitigation,
            q.QuestionSetNumber,
            q.QuestionNumber,
            q.QuestionCore,
            q.QuestionCoreNumber,
            q.Answers,
            q.QuestionLabel,
            q.QuestionDescription
          );

          if (qa.isValidationFailed) {
            hasValidationError = true;
            validationErrorMsg = qa.validationErrorMessage;
          }

          return qa;
        });

        const categoriesFiltered = categoryModel
          .filter((v) => v.QuestionCategory === category)
          .reverse()
          .pop();
        const resultFiltered = results
          .filter((r) => r.QuestionCategory === category)
          .reverse()
          .pop();

        return {
          categoryTitle: categoriesFiltered.Title || '',
          maturityLevel: resultFiltered.Level || 0,
          mitigationQuestionsAnswered: questionsAnswered
        };
      });

      if (hasValidationError) {
        const err = new Error(validationErrorMsg);
        err.status = 400;
        throw err;
      }

      const templateHtmlStr = pdfHandler.fsReadFileSync(
        pdfHandler.pathJoin(PDF_TEMPLATE_FILE_PATH)
      );
      const htmlToUriStr = pdfHandler.formatHtmlWithHandlerbars(
        { templateVariables },
        templateHtmlStr
      );
      const pdfContent = await pdfHandler.generatePdfStringUsingPuppeteer(
        htmlToUriStr
      );

      resolve(Service.successResponse(pdfContent));
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = generatePdfReport;
