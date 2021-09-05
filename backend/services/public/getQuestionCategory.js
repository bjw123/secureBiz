const Service = require('../Service');
const models = require('../../models/index');

/**
 * Get a category and its questions
 * Get a category and its questions
 *
 * id String Category's string ID _id.
 * returns category
 * */
const getQuestionCategory = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const conn = await models.connectDb();
      await conn.models.Category.findById(id).exec((e, result) => {
        if (e) reject(Service.rejectResponse(e, 500));
        models.closeDb();
        resolve(Service.successResponse(result, result ? 200 : 404));
      });
    } catch (e) {
      models.closeDb();
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = getQuestionCategory;
