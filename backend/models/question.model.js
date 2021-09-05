const mongoose = require('mongoose');
const answerSchema = require('./answer.schema');

// Create Schema
const QuestionSchema = new mongoose.Schema({
  QuestionCategory: {
    type: String,
    trim: true,
    required: true
  },
  QuestionLabel: {
    type: String,
    trim: true
  },
  QuestionDescription: {
    type: String,
    trim: true
  },
  QuestionType: {
    type: String,
    trim: true,
    required: true,
    enum: ['MULTIPLE', 'RADIO', 'BOOLEAN']
  },
  Mitigation: {
    type: String,
    trim: true
  },
  QuestionNumber: {
    type: Number,
    required: true,
    unique: true
  },
  QuestionSetNumber: {
    type: Number,
    required: true
  },
  QuestionCore: {
    type: Boolean,
    required: true
  },
  QuestionCoreNumber: {
    type: Number,
    required: () => this.QuestionCore
  },
  Answers: [
    {
      type: answerSchema,
      validate: {
        validator: () => {
          const questionValue = this.Answers.map((item) => item.Value);
          const isDuplicate = this.Answers.some(
            (item, idx) => questionValue.indexOf(item.Value) !== idx
          );
          return !(this.Answers.length <= 2 && !isDuplicate);
        },
        message: (props) =>
          `There must be at least two answers, and none can be identical.`
      }
    }
  ]
});

// Export Model, the 3rd parameter is the collection name from MongoDB
const Question = mongoose.model('Question', QuestionSchema, 'Questions');

module.exports = { Question, QuestionSchema };
