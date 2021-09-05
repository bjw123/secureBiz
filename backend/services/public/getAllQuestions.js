const Service = require('../Service');
const models = require('../../models/index');

/**
 * Get all questions
 * Get all questions
 *
 * returns List
 * */
const getAllQuestions = () =>
  new Promise(async (resolve, reject) => {
    try {
      const conn = await models.connectDb();
      // Get all questions sort by QuestionNumber
      conn.models.Question.find()
        .sort({ QuestionNumber: 1 })
        .exec((e, result) => {
          if (e) Service.reject(Service.reject(500, 'error', undefined));
          models.closeDb();
          // If DB query return data is empty, return 404 not found.
          resolve(
            result
            // Service.successResponse(result, result.length > 0 ? 200 : 404)
          );
        });
    } catch (e) {
      models.closeDb();
      Service.reject(
        'failed'
        // result
      );
    }
  });

module.exports = getAllQuestions;
