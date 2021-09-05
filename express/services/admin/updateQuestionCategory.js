const Service = require('../Service')
const models = require('../../models/index')
const { updateCategoryValidator } = require('../validators/category')

/**
 * update a question category
 * Add a question category
 *
 * id String Category's string ID _id.
 * category Category item to update (optional)
 * no response value expected for this operation
 * */
const updateQuestionCategory = ({ id, category }) => new Promise(
  async (resolve, reject) => {
    try {
      const conn = await models.connectDb()
      const categoryModel = conn.models.Category

      // Validate input.
      const validator = await updateCategoryValidator(conn, category, id)
      if (validator.hasValidationError) {
        reject(Service.rejectResponse(validator.validationErrorMsg, 400))
      }

      if (category._id) {
        delete category._id
      }

      await categoryModel.findOneAndUpdate({ _id: id }, { $set: category })
        .exec((e) => {
          if (e) reject(Service.rejectResponse(e, 500))

          resolve(Service.successResponse(category))
        })
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = updateQuestionCategory
