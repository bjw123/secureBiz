const { PublicController } = require('../controllers/index')

module.exports = {
  // the express handler implementation for getAllQuestions handler.
  getAllQuestions: PublicController.getAllQuestions
}
