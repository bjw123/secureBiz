const Service = require('../Service');
const models = require('../../models/index');
const CalculationClasses = require('../../classes/index');

/**
 * Query for the Mitigation Maturity level for core questions
 *
 * answersheet Answersheet Query for the Mitigation Maturity level for core questions (optional)
 * returns List
 * */
const postCategoryCoreResult = async (answersheet) => {
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
    let result;
    let questionsAnswered;
    let processor;
    let category;
    await Promise.all(
      categorisedAnsweredQuestions.map(async (c) => {
        const QuestionAnswered = CalculationClasses.QuestionAnswered;
        const AnsweredQuestionSetProcessor =
          CalculationClasses.AnsweredQuestionSetProcessor;

        questionsAnswered = c.map((q) => {
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

          return qa;
        });

        processor = new AnsweredQuestionSetProcessor(questionsAnswered);
      })
    );
    const categoryLevel = await processor.processQuestionCategory(category);
    console.log('-------processor-------------', categoryLevel);
    models.closeDb();
    return {
      Level: categoryLevel.Level,
      QuestionCategory: categoryLevel.category
    };
  } catch (e) {
    models.closeDb();
    return Service.reject(405, 'Invalid input', e.message);
  }
};

module.exports = postCategoryCoreResult;
