const { AdminsController } = require('../controllers/index')

module.exports = {
  // the express handler implementation for addQuestion handler.
  addQuestion: AdminsController.addQuestion
}
