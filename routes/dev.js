var express = require('express');
var router = express.Router();
var templatePath = "dev/"

/* GET default page. */
router.get('/', function(req, res, next) {
  res.render(templatePath + 'index');
});


module.exports = router;
