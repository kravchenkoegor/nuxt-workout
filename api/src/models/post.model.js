const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  exercises: {
    type: Array
  }
});

module.exports = Training = mongoose.model('training', trainingSchema);
