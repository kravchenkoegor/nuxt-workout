// require('dotenv').config()
// const path = require('path')
const TrainingController = require('./controllers/TrainingController')
const WeightController = require('./controllers/WeightController')

module.exports = (router) => {
  router.get('/', (req, res) => {
    res.send('hello world')
  })

  router.get('/history', (req, res) => {
    TrainingController.index(req, res)
  })

  router.post('/create', (req, res) => {
    TrainingController.create(req, res)
  })

  router.get('/training/:id', (req, res) => {
    TrainingController.viewOne(req, res)
  })

  router.get('/delete/:id', (req, res) => {
    TrainingController.delete(req, res)
  })

  router.get('/weight', (req, res) => {
    WeightController.getWeight(req, res)
  })

  router.post('/save-weight', (req, res) => {
    WeightController.setWeight(req, res)
  })

  // router.post('/register', (req, res) => {
  //   AuthenticationController.register(req, res)
  // })
  //
  // router.post('/login', (req, res) => {
  //   AuthenticationController.login(req, res)
  // })
  // router.post('/page', (req, res) => {
  //   PostsController.changePage(req, res)
  // })
  //

  //
  // router.get('/edit/:id', (req, res) => {
  //   PostsController.viewOne(req, res)
  // })
  //
  // router.post('/save_post', (req, res) => {
  //   PostsController.savePost(req, res)
  // })
  //

  //
  // router.post('/user', (req, res) => {
  //   AuthenticationController.getUser(req, res)
  // })
  //
  // router.post('/save_user', (req, res) => {
  //   AuthenticationController.saveUser(req, res)
  // })
}
