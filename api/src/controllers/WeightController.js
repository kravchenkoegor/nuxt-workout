const moment = require('moment')
const Weight = require('../models/weight.model')
moment.locale('ru')

module.exports = {
  async setWeight (req, res) {
    try {
      req.body.date = moment(req.body.date).format('D.MM.YYYY')
      const result = await new Weight(req.body).save()
      res.json(result)
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  async getWeight (req, res) {
    try {
      const result = await Weight.find({})
      res.json(result)
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  }
}
