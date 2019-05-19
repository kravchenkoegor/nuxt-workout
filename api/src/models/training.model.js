const mongoose = require('mongoose');

const {ObjectId} = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
}

const trainingSchema = new mongoose.Schema({
  day: {
    type: String
  },
  month: {
    type: String
  },
  year: {
    type: String
  },
  date: {
    type: String
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  exercises: {
    type: Array
  },
  circuits: {
    type: Array
  },
  createdBy: {
    type: ObjectId,
    // required: true,
    ref: 'User'
  },
})

/* eslint-disable no-undef */
module.exports = Training = mongoose.model('training', trainingSchema)
