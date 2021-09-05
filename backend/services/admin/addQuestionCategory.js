const Service = require('../Service')
const models = require('../../models/index')
const { addCategoryValidator } = require('../validators/category')

/**
 * Add a category
 * Add a category
 *
 * category Category category to add (optional)
 * no response value expected for this operation
 * */
const addQuestionCategory = ({ category }) => new Promise(
  async (resolve, reject) => {
    try {
      const conn = await models.connectDb()
      const categoryModel = conn.models.Category

      // Validate input.
      const validator = await addCategoryValidator(conn, category)
      if (validator.hasValidationError) {
        reject(Service.rejectResponse(validator.validationErrorMsg, 400))
      }

      if (category._id) delete category._id

      // Create new category model and save.
      const newCategory = new categoryModel(category)
      await newCategory.save((e) => {
        if (e) reject(Service.rejectResponse(e, 500))

        resolve(Service.successResponse(newCategory, 201))
      })
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = addQuestionCategory
