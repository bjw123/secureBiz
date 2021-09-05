const { AdminsController } = require('../controllers/index')

module.exports = {
  // the express handler implementation for getFeedback handler.
  getFeedback: AdminsController.getFeedback
}
