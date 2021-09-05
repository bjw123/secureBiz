const Service = require('../Service')
const models = require('../../models/index')
const { addQuestionValidator } = require('../validators/question')

/**
 * Create a question
 * Create a question
 *
 * question Question question to add (optional)
 * no response value expected for this operation
 * */
const addQuestion = ({ question }) => new Promise(
  async (resolve, reject) => {
    try {
      // Initialise connection and models.
      const conn = await models.connectDb()
      const questionModel = conn.models.Question

      // Validate input.
      const validator = await addQuestionValidator(conn, question)
      if (validator.hasValidationError) {
        reject(Service.rejectResponse(validator.validationErrorMsg, 400))
      }

      // Remove _id from request body's question object.
      if (question._id) delete question._id

      // Create new model and save.
      const newQuestion = new questionModel(question)
      await newQuestion.save((e) => {
        if (e) reject(Service.rejectResponse(e, 500))

        resolve(Service.successResponse(newQuestion, 201))
      })
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = addQuestion
