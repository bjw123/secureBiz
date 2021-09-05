const Service = require('../Service')
const models = require('../../models/index')

/**
 * Get all feedback
 * Get a list of feedback
 *
 * returns inline_response_200_1
 * */
const getAllFeedback = () => new Promise(
  async (resolve, reject) => {
    try {
      const conn = await models.connectDb()
      await conn.models.Feedback.find().sort({ _id: 1 }).exec((e, fb) => {
        if (e) reject(Service.rejectResponse(e, 400))

        let total
        if (fb.length) total = fb.length
        resolve(Service.successResponse({ total, fb }, total > 0 ? 200 : 404))
      })
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = getAllFeedback
