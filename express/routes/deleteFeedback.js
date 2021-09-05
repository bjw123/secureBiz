const { AdminsController } = require('../controllers/index')

module.exports = {
  // the express handler implementation for deleteFeedback handler.
  deleteFeedback: AdminsController.deleteFeedback
}
