const { PublicController } = require('../controllers/index')

module.exports = {
  // the express handler implementation for getAllQuestionCategories handler.
  getAllQuestionCategories: PublicController.getAllQuestionCategories
}
