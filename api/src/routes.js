const AuthController = require('./controllers/AuthenticationController');
const TrainingController = require('./controllers/TrainingController');
const WeightController = require('./controllers/WeightController');

module.exports = (router) => {
  router.post('/register', (req, res) => AuthController.register(req, res));
  router.post('/login', (req, res) => AuthController.login(req, res));
  router.post('/user', (req, res) => AuthController.getUserById(req, res));

  router.post('/history', (req, res) => TrainingController.getUserTrainings(req, res));
  router.get('/history/:id', (req, res) => TrainingController.getUserTrainingsByDate(req, res));

  router.post('/create', (req, res) => TrainingController.create(req, res));
  router.get('/training/:id', (req, res) => TrainingController.viewOne(req, res));
  router.get('/delete/:id', (req, res) => TrainingController.delete(req, res));

  router.get('/weight', (req, res) => WeightController.getWeight(req, res));
  router.post('/save-weight', (req, res) => WeightController.setWeight(req, res));
}
