const { PublicController } = require('../controllers/index')

module.exports = {
  // the express handler implementation for getQuestion handler.
  getQuestion: PublicController.getQuestion
}
