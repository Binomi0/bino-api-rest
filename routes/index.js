var express = require('express')
//var auth = require('../middlewares/auth')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

router.get('/createpost', function(req, res, next) {
  res.render('createpost', null)
});

router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', null)
});

router.get('/createclub', function(req, res, next) {
  res.render('createclub', null)
});

router.get('/updateclub', function(req, res, next) {
  res.render('updateclub', null)
});

router.get('/createatleta', function(req, res, next) {
  res.render('createatleta', null)
});

// router.get('/privado', auth, (req, res) => {
//   res.status(200).send({ message: 'Tienes Acceso' })
// })






module.exports = router;
