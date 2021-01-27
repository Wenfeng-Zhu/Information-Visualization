var express = require('express');
var router = express.Router();

var sumOfState = require('../public/DataSources/total-cases-by-state.json');
var dailyState = require('../public/DataSources/infections-by-state-daily.json');
var deathSum = require('../public/DataSources/deaths-by-state.json');
var series = require('../public/DataSources/testdata.json');
var gdp = require('../public/DataSources/BasicDataOfStates.json');
var policy = require('../public/DataSources/state-policy.json');

/* GET users listing. */
router.get('/total-cases-by-state', function (req, res, next) {
    res.json({sumOfState});
});

router.get('/infections-by-state-daily', function (req, res, N) {
    res.json({dailyState});
});

router.get('/deaths-by-state', function (req, res, N) {
    res.json({deathSum});
});

router.get('/testdata', function (req, res) {
    res.send(series);
});

router.get('/gdp', function (req, res) {
    res.send(gdp);
});

router.get('/policy', function (req, res) {
    res.json({policy});
});

module.exports = router;
