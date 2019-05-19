require('dotenv').config();
const mongoose = require('mongoose');
const mongooseOptions = {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
};
require('./models/user.model');

module.exports = {
  User: mongoose.model('users'),
  connect () {
    mongoose.connect(process.env.PROD_MONGODB, mongooseOptions)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(err))
  }
};
