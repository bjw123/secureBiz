const addFeedback = require('./public/addFeedback');
const generatePdfReport = require('./public/generatePdfReport');
const getAllQuestionCategories = require('./public/getAllQuestionCategories');
const getAllQuestions = require('./public/getAllQuestions');
const getCategoryQuestions = require('./public/getCategoryQuestions');
const getQuestion = require('./public/getQuestion');
const getQuestionCategory = require('./public/getQuestionCategory');
const postCategoryCoreResult = require('./public/postCategoryCoreResult');
const queryQuestionCategoryResult = require('./public/queryQuestionCategoryResult');

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
