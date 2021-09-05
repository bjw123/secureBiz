const mongoose = require('mongoose');

// Get the Schema constructor
const { Schema } = mongoose;

// Using Schema constructor, create a AnswerSchema
const AnswerSchema = new Schema({
  Value: Schema.Types.Mixed,
  Label: String,
  QuestionNext: Number,
  QuestionNextCore: Number
});

// Export Schema
module.exports = AnswerSchema;
