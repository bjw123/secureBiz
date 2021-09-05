const Service = require('../Service');
const models = require('../../models/index');

/**
 * Get a question
 * Get a question
 *
 * QuestionNumber QuestionNumber of question to return
 * returns question
 * */
const getQuestion = ({ QuestionNumber }) =>
  new Promise(async (resolve, reject) => {
    try {
      const conn = await models.connectDb();
      // Get a questions based on the QuestionNumber {id}.
      conn.models.Question.find({ QuestionNumber: QuestionNumber }).exec(
        (e, result) => {
          if (e) reject(Service.rejectResponse(e, 500));

          resolve(
            Service.successResponse(result, result.length > 0 ? 200 : 404)
          );
        }
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = getQuestion;
