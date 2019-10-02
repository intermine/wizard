var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home');
});

router.get('/register', function(req, res) {
  res.render('register');
});

/*  GET individual intermine config. Note this is different from
    the config route in the wizard. This page views an existing mine config.
    The wizard page allows users to set a new mine's config. */

/* TODO ADD individual mine routing */

router.get('/config', function(req, res) {
  res.render('mine-config');
});

/* GET mine builder dashboard. Currently same as default */
router.get('/dashboard', function(req, res) {
  res.render('dashboard');
});


module.exports = router;
