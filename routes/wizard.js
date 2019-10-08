var express = require('express');
var router = express.Router();
var templatePath = "wizard/"
var wizardSteps = require('../views/wizard/wizardSteps.js')

/* GET default page. */
router.get('/', function(req, res) {
  res.render(templatePath + 'upload', {steps: wizardSteps.steps});
});

/* Dynamically generate wizard pages based on the views/wizard/wizardSteps config */
wizardSteps.steps.map(function(step) {
  router.get('/' + step.name, function(req, res) {
    res.render(templatePath + step.name, {steps: wizardSteps.steps});
  });
})

module.exports = router;
