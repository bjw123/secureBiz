const Controller = require('./Controller');

module.exports = class PdfController extends Controller {
  static sendResponse(response, payload) {
    /**
     * The default response-code is 200. We want to allow to change that. in That case,
     * payload will be an object consisting of a code and a payload. If not customized
     * send 200 and the payload as received in this method.
     */
    response.status(payload.code || 200);
    const responsePayload =
      payload.payload !== undefined ? payload.payload : payload;
    if (typeof responsePayload !== 'undefined') {
      response.contentType('application/pdf');
      response.send(responsePayload);
    } else {
      response.end(responsePayload);
    }
  }

  static async handleRequest(request, response, serviceOperation) {
    try {
      const serviceResponse = await serviceOperation(
        this.collectRequestParams(request)
      );
      PdfController.sendResponse(response, serviceResponse);
    } catch (error) {
      PdfController.sendError(response, error);
    }
  }
};
