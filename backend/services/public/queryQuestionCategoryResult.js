const Service = require('../Service');
const CalculationClasses = require('../../classes/index');

/**
 * Query for the Mitigation Maturity level
 * Query for the Mitigation Maturity level
 *
 * id Long ID of question category to return
 * answersheet Answersheet Query for the Mitigation Maturity level (optional)
 * returns inline_response_200
 * */
const queryQuestionCategoryResult = async (answersheet) => {
  try {
    const aq = answersheet.Questions;
    if (!aq || (aq && aq.length === 0)) {
      return Service.reject(422, 'Invalid questions data.');
    }

    const QuestionAnswered = CalculationClasses.QuestionAnswered;
    const AnsweredQuestionSetProcessor =
      CalculationClasses.AnsweredQuestionSetProcessor;
    // {string} category QuestionCategory string value
    let category;

    let hasValidationError = false;
    let validationErrorMsg = '';

    // {CalculationClasses.QuestionAnswered[]} questionsAnswered Convert questions to QuestionAnswered array.
    console.log('----------aq-------------', aq);
    const questionsAnswered = aq.map((q) => {
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

    if (hasValidationError) {
      const err = new Error(validationErrorMsg);
      err.status = 400;
      throw err;
    }

    const processor = new AnsweredQuestionSetProcessor(questionsAnswered);
    // Resolving expressions and get calculation result level ready.
    // processor.processQuestionCategory(category) returns a {Promise}
    const result = await processor
      .processQuestionCategory(category)
      .then(() => ({ level: processor.Level }));

    return result;
  } catch (e) {
    console.log(' e.message', e.message);
    throw new Error('Invalid input');
  }
};

module.exports = queryQuestionCategoryResult;
