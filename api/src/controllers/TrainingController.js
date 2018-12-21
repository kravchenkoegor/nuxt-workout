const Training = require('../models/training.model')

module.exports = {
  async getUserTrainings(req, res) {
    try {
      const trainings = await Training.find({createdBy: req.body.userId});
      if (!trainings) res.status(400).send({error: 'Тренировок не найдено'});
      res.send(trainings)
    } catch (error) {
      res.status(400).send({error: `An error has occured ${error}`})
    }
  },
  async getUserTrainingsByDate (req, res) {
    try {
      const [year, month] = req.params.id.split('-')
      const training = await Training.find({ year, month })
      res.send(training)
    } catch (error) {
      res.status(400).send({error: `An error has occured ${error}`})
    }
  },
  async create (req, res) {
    try {
      console.log(req.body)
      const post = await new Training(req.body).save()
      res.json(post)
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  // async changePage (req, res) {
  //   try {
  //     const {page} = req.body
  //     const result = await Post.find({}).limit(8).skip((page - 1) * 8)
  //     res.send(result)
  //   } catch (error) {
  //     res.status(400).send({
  //       error: `An error has occured ${error}`
  //     })
  //   }
  // },
  async viewOne (req, res) {
    try {
      const post = await Training.findOne({ _id: req.params.id })
      res.json(post)
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  // async savePost (req, res) {
  //   try {
  //     const post = await Post.findByIdAndUpdate(req.body.id, req.body)
  //     post.save()
  //     res.json(post)
  //   } catch (error) {
  //     res.status(400).send({
  //       error: `An error has occured ${error}`
  //     })
  //   }
  // },
  async delete (req, res) {
    try {
      const post = await Training.findByIdAndRemove(req.params.id)
      res.json(post)
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  }
}
