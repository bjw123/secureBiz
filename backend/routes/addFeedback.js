const { PublicController } = require('../controllers/index');

module.exports = {
  // the express handler implementation for addFeedback handler.
  addFeedback: PublicController.addFeedback
};
