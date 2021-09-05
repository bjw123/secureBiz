/**
 * The AdminsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller')
const service = require('../services/AdminsService')
const addQuestion = async (request, response) => {
  await Controller.handleRequest(request, response, service.addQuestion)
}

const addQuestionCategory = async (request, response) => {
  await Controller.handleRequest(request, response, service.addQuestionCategory)
}

const deleteFeedback = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteFeedback)
}

const deleteQuestion = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteQuestion)
}

const deleteQuestionCategory = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteQuestionCategory)
}

const getAllFeedback = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllFeedback)
}

const getFeedback = async (request, response) => {
  await Controller.handleRequest(request, response, service.getFeedback)
}

const updateQuestion = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateQuestion)
}

const updateQuestionCategory = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateQuestionCategory)
}

module.exports = {
  addQuestion,
  addQuestionCategory,
  deleteFeedback,
  deleteQuestion,
  deleteQuestionCategory,
  getAllFeedback,
  getFeedback,
  updateQuestion,
  updateQuestionCategory
}
