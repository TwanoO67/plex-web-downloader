var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var config = res.locals.config;
  res.send('respond with a resource');
});

module.exports = router;
