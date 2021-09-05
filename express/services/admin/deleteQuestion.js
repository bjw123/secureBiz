const Service = require('../Service')
const models = require('../../models/index')

/**
 * Delete a question
 * Delete a question
 *
 * id Long ID of question to delete
 * no response value expected for this operation
 * */
const deleteQuestion = ({ QuestionNumber }) => new Promise(
  async (resolve, reject) => {
    try {
      // Initialise connection and models.
      const conn = await models.connectDb()
      const questionModel = conn.models.Question

      if (!(await questionModel.findOne({ QuestionNumber }).exec())) {
        reject(Service.rejectResponse('Error. Record not found.', 500))
      }

      await questionModel.findOneAndDelete({ QuestionNumber }).exec((e) => {
        if (e) reject(Service.rejectResponse(e, 500))

        resolve(Service.successResponse({ QuestionNumber }))
      })
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = deleteQuestion
