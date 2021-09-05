const mongoose = require('mongoose');
const Category = require('./category.model');
const { dbConnect } = require('../config/dbConnect');
const Feedback = require('./feedback.model');
const { Question, QuestionSchema } = require('./question.model');

// Connect to MongoDB using config URI from config/dbConnect.js.
const connectDb = async () =>
  await mongoose
    .connect(dbConnect.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .catch((e) => {
      console.error(e);
    });

module.exports = { Question, QuestionSchema, Category, connectDb, Feedback };
