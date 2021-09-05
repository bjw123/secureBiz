const Service = require('../Service');
const models = require('../../models/index');
const CalculationClasses = require('../../classes/index');

/**
 * Query for the Mitigation Maturity level for core questions
 *
 * answersheet Answersheet Query for the Mitigation Maturity level for core questions (optional)
 * returns List
 * */
const postCategoryCoreResult = ({ answersheet }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Get the answered questions array.
      const answeredQuestions = answersheet.Questions;

      // Get the categories from DB.
      const categoryModel = await models
        .connectDb()
        .then(() => models.Category.find().exec());
      // Convert the categories to array: ["PatchOS","MFA","Backups",...]
      const categories = categoryModel.map((c) => c.QuestionCategory);

      const categorisedAnsweredQuestions = categories
        .map((c) => answeredQuestions.filter((aq) => c === aq.QuestionCategory))
        .filter((e) => e.length > 0);

      let hasValidationError = false;
      let validationErrorMsg = '';

      const results = categorisedAnsweredQuestions.map(async (c) => {
        const QuestionAnswered = CalculationClasses.QuestionAnswered;
        const AnsweredQuestionSetProcessor =
          CalculationClasses.AnsweredQuestionSetProcessor;
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
            q.Answers
          );

          if (qa.isValidationFailed) {
            hasValidationError = true;
            validationErrorMsg = qa.validationErrorMessage;
          }

          return qa;
        });

        const processor = new AnsweredQuestionSetProcessor(questionsAnswered);
        // Resolving expressions and get calculation result level ready.
        // processor.processQuestionCategory(category) returns a {Promise}
        return await processor
          .processQuestionCategory(category)
          .then((data) => {
            console.log('processQuestionCategory', data);
            return { Level: data.Level, QuestionCategory: data.category };
          });
      });

      if (hasValidationError) {
        const err = new Error(validationErrorMsg);
        err.status = 400;
        throw err;
      }

      Promise.all(results).then((res) => resolve(Service.successResponse(res)));
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = postCategoryCoreResult;
