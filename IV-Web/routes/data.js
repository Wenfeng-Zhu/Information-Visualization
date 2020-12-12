var express = require('express');
var router = express.Router();

var sumOfState = require('../public/DataSources/total-cases-by-state.json')

/* GET users listing. */
router.get('/total-cases-by-state', function(req, res, next) {
  res.json({sumOfState});
});

module.exports = router;
