var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
    res.render('index', { title: 'Products List Page' });
});

module.exports = router