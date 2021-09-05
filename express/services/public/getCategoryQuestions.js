const Service = require('../Service');
const models = require('../../models/index');

/**
 * Get questions based on QuestionCategory and/or QuestionCore query
 *
 * InlineObject1 InlineObject1  (optional)
 * returns List
 * */
const getCategoryQuestions = (req) =>
  new Promise(async (resolve, reject) => {
    try {
      const conn = await models.connectDb();
      const query = {};
      // Assign query parameters from request body. InlineObject1 is request object.
      if (req.body && req.body.QuestionCategory) {
        query.QuestionCategory = req.body.QuestionCategory;
      }

      if (req.body && typeof req.body.QuestionCore === 'boolean') {
        query.QuestionCore = req.body.QuestionCore;
      }

      conn.models.Question.find(query)
        // Sort by QuestionCategory, then QuestionSetNumber.
        .sort({ QuestionCategory: 1, QuestionSetNumber: 1 })
        .exec((e, result) => {
          if (e) reject(Service.rejectResponse(e, 500));

          // If DB query return data is empty, return 404 not found.
          resolve(
            Service.successResponse(result, result.length > 0 ? 200 : 404)
          );
        });
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = getCategoryQuestions;
