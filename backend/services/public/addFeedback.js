// Filter $ sign to prevent MongoDB query selector injection attacks.
const sanitize = require('mongo-sanitize');

// Filter some HTML tags as well as <script></script> tags to prevent xss attacks.
const sanitizeHtml = require('sanitize-html');

const Service = require('../Service');
const models = require('../../models/index');

/**
 * Add feedback
 * Add feedback
 *
 * feedback Feedback feedback to add (optional)
 * no response value expected for this operation
 * */
const addFeedback = (feedback) =>
  new Promise(async (resolve, reject) => {
    try {
      const conn = await models.connectDb();
      const Feedback = conn.models.Feedback;
      console.log('feedback handled', feedback);

      //  Duplication Rejection Statement commented-out to allow identical feedback submission
      // const identicalFb = await Feedback.findOne(feedback)
      // if (identicalFb && identicalFb._id) {
      //   reject(Service.rejectResponse('Duplicate input.', 409))
      // }

      Feedback.createdAt = Date.now();
      const fb = new Feedback(feedback);
      await fb
        .save()
        .then((r) => {
          console.log('feedback saved', r);
          models.closeDb();
        })
        .catch((e) => {
          reject(Service.reject(400, undefined, e));
        });

      resolve(Service.success(fb));
    } catch (e) {
      models.closeDb();
      reject(Service.reject(405, 'Invalid input', e.status));
    }
  });

module.exports = addFeedback;
