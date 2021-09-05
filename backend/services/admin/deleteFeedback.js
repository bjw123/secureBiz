const Service = require('../Service')
const models = require('../../models/index')

/**
 * delete a feedback
 * Delete a feedback
 *
 * id Long ID of the feedback to delete
 * no response value expected for this operation
 * */
const deleteFeedback = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const conn = await models.connectDb()
      await conn.models.Feedback.findOneAndDelete(id).exec(e => {
        if (e) reject(Service.rejectResponse(e, 400))
      })

      resolve(Service.successResponse({
        id
      }))
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = deleteFeedback
