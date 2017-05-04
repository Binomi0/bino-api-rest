var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createpost', function(req, res, next) {
  res.render('createpost', null);
});

router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', null);
});

router.get('/createclub', function(req, res, next) {
  res.render('createclub', null);
});

router.get('/createatleta', function(req, res, next) {
  res.render('createatleta', null);
});
module.exports = router;
