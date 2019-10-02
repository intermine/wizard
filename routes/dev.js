var express = require('express');
var router = express.Router();
var templatePath = "dev/"

/* GET default page. */
router.get('/', function(req, res) {
  res.render(templatePath + 'index');
});


module.exports = router;
