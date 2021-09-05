const Service = require('../Service')
const models = require('../../models/index')

/**
 * Delete a question category
 * Delete a question category
 *
 * id String Category's string ID _id.
 * no response value expected for this operation
 * */
const deleteQuestionCategory = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      // Initialise connection and models.
      const conn = await models.connectDb()
      const categoryModel = conn.models.Category
      const filter = { _id: id }

      if (!(await categoryModel.findOne(filter).exec())) {
        reject(Service.rejectResponse('Error. Record not found.', 500))
      }

      await categoryModel.findOneAndDelete(filter).exec((e) => {
        if (e) reject(Service.rejectResponse(e, 500))

        resolve(Service.successResponse(filter))
      })
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = deleteQuestionCategory
