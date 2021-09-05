const service = require('../Service');
const models = require('../../models/index');
const { decrypt } = require('../../utils/cryptfun');

/**
 * Get all feedback
 * Get a list of feedback
 *
 * returns inline_response_200_1
 * */
const getAllFeedback = async () => {
  try {
    const conn = await models.connectDb();
    const fb = await conn.models.Feedback.find();

    console.log('getAllFeedback', fb);
    const decryptedFb = fb.map((v, i) => {
      const phoneUncrypt = decrypt(v.phone);
      console.log('phoneUncrypt', phoneUncrypt);
      const emailUncrypt = decrypt(v.email);
      models.closeDb();
      return {
        ...v._doc,
        phone: phoneUncrypt,
        email: emailUncrypt
      };
    });
    console.log('decryptedFb', decryptedFb);

    return decryptedFb;
  } catch (e) {
    models.closeDb();
    console.log('getAllFeedback error', e);
    service.reject(405, 'Invalid input');
  }
};

module.exports = getAllFeedback;
