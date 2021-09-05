const Service = require('../Service');
const models = require('../../models/index');

/**
 * Get all categories
 * Get all categories
 *
 * QuestionCategory String If QuestionCategory is present, return only specified category. (optional)
 * returns List
 * */
const getAllQuestionCategories = ({ QuestionCategory }) =>
  new Promise(async (resolve, reject) => {
    try {
      // If QuestionCategory is present, pass it in to query.
      const query = QuestionCategory
        ? { QuestionCategory: QuestionCategory }
        : {};

      const conn = await models.connectDb();
      conn.models.Category.find(query, (e, result) => {
        if (e) reject(Service.rejectResponse(e, 500));

        // If DB query return data is empty, return 404 not found.
        resolve(Service.successResponse(result, result.length > 0 ? 200 : 404));
      });
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = getAllQuestionCategories;
