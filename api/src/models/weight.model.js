const mongoose = require ('mongoose');

const weightSchema = new mongoose.Schema({
  date: String,
  weight: Number,
  deltaYesterday: Number,
  deltaStart: Number
});

module.exports = Weight = mongoose.model('weight', weightSchema);
