const { PublicController } = require('../controllers/index');

module.exports = {
  // the express handler implementation for getFeedback handler.
  getCategoryQuestions: PublicController.getCategoryQuestions
};
