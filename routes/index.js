var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login Page' });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Registration Page' });
});
router.get('/products/regi', function(req, res, next) {
  res.render('index', { title: 'product Page' });
});

module.exports = router;
