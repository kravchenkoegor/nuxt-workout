const jwt = require('jsonwebtoken');
const config = require('../config/main');
const {User} = require('../database');

function createToken(user, secret, expiresIn) {
  const {username, email} = user;
  return jwt.sign({username, email}, secret, {expiresIn});
}

module.exports = {
  async register(req, res) {
    try {
      const {username, email, password} = req.body;
      const user = await User.findOne({username});

      if (!user) {
        const newUser = await new User({username, email, password}).save();
        res.json({
          user: newUser,
          token: createToken(newUser, config.secret, '1w')
        });
      } else {
        res.status(400).send({error: 'Пользователь уже существует'});
      }
    } catch (error) {
      res.status(400).send({error: `An error has occured ${error}`});
    }
  },
  async login(req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({username});

      if (!user) res.status(400).send({error: 'Пользователя не существует'});
      else {
        if (user.password === password) {
          res.json({
            user,
            token: createToken(user, config.secret, '1w')
          });
        } else {
          res.status(400).send({error: 'Неверный пароль'})
        }
      }
    } catch (error) {
      res.status(400).send({error: `An error has occured ${error}`});
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findOne({_id: req.body.userId});

      if (!user) res.status(200).send({error: 'Пользователя не существует'});
      else {
        res.json({
          user,
          token: createToken(user, config.secret, '1w')
        });
      }
    } catch (error) {
      res.status(400).send({error: `An error has occured ${error}`});
    }
  }
}
