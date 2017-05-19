var express = require('express')
var auth = require('../middlewares/auth')
// , LocalStrategy = require('passport-local').Strategy
, userCtrl = require('../controllers/UserController')
, router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Panel de Admin de Karate Santa Pola' })
});

router.post('/signup', userCtrl.signUp)
router.post('/signin', userCtrl.signIn)
router.get('/registro', (req, res) => {
  res.render('registro')
})

router.post('/login', (req, res) => {
  console.log('REQ: ',req.body, 'RES: ', res.body)
  res.render('login')
})

router.get('/admin', auth, function (req, res) {
    res.render('admin')
});

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource
  res.render(resource, null)
});

// router.get('/createpost', function(req, res, next) {
//   res.render('createpost', null)
// });

// router.get('/createcomment', function(req, res, next) {
//   res.render('createcomment', null)
// });

// router.get('/createclub', function(req, res, next) {
//   res.render('createclub', null)
// });

// router.get('/updateclub', function(req, res, next) {
//   res.render('updateclub', null)
// });

// router.get('/createatleta', function(req, res, next) {
//   res.render('createatleta', null)
// });

// router.get('/deleteatleta', function(req, res, next) {
//   res.render('deleteatleta', null)
// });

module.exports = router;
