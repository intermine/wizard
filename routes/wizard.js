var express = require('express');
var router = express.Router();
var templatePath = "wizard/"

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render(templatePath + 'dashboard');
});
/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
  res.render(templatePath + 'dashboard');
});

module.exports = router;
