const Service = require('../Service')
const models = require('../../models/index')

/**
 * Get a feedback
 * Get a feedback
 *
 * id Long ID of the feedback to return
 * returns feedback
 * */
const getFeedback = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const conn = await models.connectDb()
      await conn.models.Feedback.findById(id).exec((e, fb) => {
        if (e) reject(Service.rejectResponse(e, 400))

        if (fb !== null) {
          resolve(Service.successResponse(fb, 200))
        }

        reject(Service.rejectResponse('Record not found.', 404))
      })
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = getFeedback
