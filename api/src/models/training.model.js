const mongoose = require('mongoose')

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
  }
})

/* eslint-disable no-undef */
module.exports = Training = mongoose.model('training', trainingSchema)
