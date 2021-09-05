const mongoose = require('mongoose');

const { Schema } = mongoose;

const StatsSchema = new Schema({
  category: String,
  createdAt: { type: Date, default: Date.now }
});

const Stats = mongoose.model('Stats', StatsSchema, 'Stats');

module.exports = { Stats, StatsSchema };
