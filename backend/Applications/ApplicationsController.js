var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ApplicationsFunction = require('../Applications/ApplicationsFunctions');
router.use(bodyParser.json());


router.post('/addNewApplication', function (req, res) {

    ApplicationsFunction.addNewApplication(req.body, function (value) {
        if (value != null) {
            res.status(201).json(value);
        } else {
            res.status(400).json(value);
        }
    });
});


router.get('/getAllApplications', function (req, res) {

    ApplicationsFunction.getAllApplications(req.headers, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});


router.get('/getAllApplicationsForTerm', function (req, res) {

    ApplicationsFunction.getAllApplicationsForTerm(req.headers, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});


router.delete('/deleteApplication', function (req, res) {

    ApplicationsFunction.deleteApplication(req.body, function (value) {
        if (value != null) {
            res.status(201).json(value);
        } else {
            res.status(400).json(value);
        }
    });

});


module.exports = router;
