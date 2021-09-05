const mongoose = require('mongoose');
/* eslint-disable no-unused-vars */
const { Question, QuestionSchema } = require('./question.model');

const { Schema } = mongoose;

const ExpressionSchema = new Schema({
  Operator: String,
  Rules: [Schema.Types.Mixed],
  Override: Boolean,
  Level: Number
});

const CategorySchema = new Schema({
  QuestionCategory: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  CodeName: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  Title: String,
  IsVisible: Boolean,
  Tooltip: String,
  Slug: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  Desc: String,
  DetailedDesc: String,
  Expressions: [ExpressionSchema]
});

// Export Model, the 3rd parameter is the collection name from MongoDB.
module.exports = mongoose.model('Category', CategorySchema, 'Categories');
