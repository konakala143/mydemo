var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

router.get('/siva', function(req, res, next) {
    res.render('index', { title: 'Samba login' });
});

module.exports = router
