var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', function(req, res) {
  res.render('users/profile');
});

module.exports = router;
