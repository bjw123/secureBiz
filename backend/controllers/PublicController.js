/**
 * The PublicController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const PdfController = require('./PdfController');
const service = require('../services/PublicService');

const addFeedback = async (request, response) => {
  await Controller.handleRequest(request, response, service.addFeedback);
};

const generatePdfReport = async (request, response) => {
  await PdfController.handleRequest(
    request,
    response,
    service.generatePdfReport
  );
};

const getAllQuestionCategories = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.getAllQuestionCategories
  );
};

const getAllQuestions = async () => {
  return service.getAllQuestions();
  // await Controller.handleRequest(request, response, service.getAllQuestions)
};

const getCategoryQuestions = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.getCategoryQuestions
  );
};

const getQuestion = async (request, response) => {
  await Controller.handleRequest(request, response, service.getQuestion);
};

const getQuestionCategory = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.getQuestionCategory
  );
};

const postCategoryCoreResult = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.postCategoryCoreResult
  );
};

const queryQuestionCategoryResult = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.queryQuestionCategoryResult
  );
};

module.exports = {
  addFeedback,
  generatePdfReport,
  getAllQuestionCategories,
  getAllQuestions,
  getCategoryQuestions,
  getQuestion,
  getQuestionCategory,
  postCategoryCoreResult,
  queryQuestionCategoryResult
};
