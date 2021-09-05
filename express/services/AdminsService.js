const addQuestion = require('./admin/addQuestion');
const addQuestionCategory = require('./admin/addQuestionCategory');
const deleteFeedback = require('./admin/deleteFeedback');
const deleteQuestion = require('./admin/deleteQuestion');
const deleteQuestionCategory = require('./admin/deleteQuestionCategory');
const getAllFeedback = require('./admin/getAllFeedback');
const getFeedback = require('./admin/getFeedback');
const updateQuestion = require('./admin/updateQuestion');
const updateQuestionCategory = require('./admin/updateQuestionCategory');

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
};
