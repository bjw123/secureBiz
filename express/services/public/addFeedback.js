const Service = require('../Service');
const models = require('../../models/index');

// Filter $ sign to prevent MongoDB query selector injection attacks.
const sanitize = require('mongo-sanitize');

// Filter some HTML tags as well as <script></script> tags to prevent xss attacks.
const sanitizeHtml = require('sanitize-html');

/**
 * Add feedback
 * Add feedback
 *
 * feedback Feedback feedback to add (optional)
 * no response value expected for this operation
 * */
const addFeedback = ({ feedback }) =>
  new Promise(async (resolve, reject) => {
    try {
      const conn = await models.connectDb();
      const Feedback = conn.models.Feedback;

      // Iterate through feedback request body's properties, sanitise each value.
      for (let [key, value] of Object.entries(feedback)) {
        value = sanitize(value);
        value = sanitizeHtml(value);
        feedback[key] = value;
      }

      //  Duplication Rejection Statement commented-out to allow identical feedback submission
      // const identicalFb = await Feedback.findOne(feedback)
      // if (identicalFb && identicalFb._id) {
      //   reject(Service.rejectResponse('Duplicate input.', 409))
      // }

      feedback.createdAt = Date.now();
      const fb = new Feedback(feedback);
      await fb.save().catch((e) => {
        reject(Service.rejectResponse(e, 400));
      });

      resolve(Service.successResponse(fb));
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = addFeedback;
