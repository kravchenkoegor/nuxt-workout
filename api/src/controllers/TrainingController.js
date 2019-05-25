const Training = require('../models/training.model');

function sendError(error) {

}

module.exports = {
  async getUserTrainings(req, res) {
    try {
      const trainings = await Training.find({createdBy: req.body.userId});
      if (!trainings) {
        res.status(400).send({
          error: 'Тренировок не найдено'
        });
      }
      res.send(trainings);
    } catch (error) {
      res.status(400).send({error: `An error has occured ${error}`})
    }
  },
  async getUserTrainingsByDate(req, res) {
    try {
      const [year, month] = req.params.id.split('-');
      const training = await Training.find({year, month});
      res.send(training);
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      });
    }
  },
  async create(req, res) {
    try {
      const post = await new Training(req.body).save();
      res.json(post);
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      });
    }
  },
  async viewOne(req, res) {
    try {
      const post = await Training.findOne({_id: req.params.id});
      res.json(post);
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      });
    }
  },
  async delete(req, res) {
    try {
      const post = await Training.findByIdAndRemove(req.params.id);
      res.json(post);
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      });
    }
  }
}
