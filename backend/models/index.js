const mongoose = require('mongoose');
const Category = require('./category.model');
const { config } = require('../config/config');
const Feedback = require('./feedback.model');
const { Question, QuestionSchema } = require('./question.model');
const { Stats, statsSchema } = require('./stats.model');
const { AdminUser } = require('./adminUser.modal');

// Connect to MongoDB using config URI from config/dbConnect.js.
const connectDb = async () =>
  await mongoose
    .connect(config.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .catch((e) => {
      console.error(e);
    });

const closeDb = async () =>
  await mongoose.connection.close().catch((e) => {
    console.error(e);
  });

module.exports = {
  Question,
  AdminUser,
  QuestionSchema,
  Category,
  connectDb,
  closeDb,
  Feedback,
  Stats,
  statsSchema
};
