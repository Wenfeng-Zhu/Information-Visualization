var express = require('express');
var router = express.Router();

var sumOfState = require('../public/DataSources/total-cases-by-state.json')
var dailyState = require('../public/DataSources/infections-by-state-daily.json')

/* GET users listing. */
router.get('/total-cases-by-state', function(req, res, next) {
  res.json({sumOfState});
});

router.get('/infections-by-state-daily',function (req,res,N){
  res.json({dailyState});
});

module.exports = router;
