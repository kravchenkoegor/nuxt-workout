const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdDate: {
    type: String,
    default: moment().format('DD.MM.YYYY')
  }
});

mongoose.model('users', userSchema);
