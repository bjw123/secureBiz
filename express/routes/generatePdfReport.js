const { PublicController } = require('../controllers/index')

module.exports = {
  // the express handler implementation for generatePdfReport handler.
  generatePdfReport: PublicController.generatePdfReport
}
