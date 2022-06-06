var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var LanguagesFunction = require('../Languages/LanguagesFunctions');
const TermsFunction = require("../Terms/TermsFunctions");
router.use(bodyParser.json());


router.get('/getAllApplicationTerms', function (req, res) {

    LanguagesFunction.getAllApplicationTerms(req.headers, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});


router.get('/getAllLanguages', function (req, res) {

    LanguagesFunction.getAllLanguages(req.headers, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});

router.post('/updateLanguage', function (req, res) {

    LanguagesFunction.updateLanguage(req.body, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});

router.delete('/deleteLanguage', function (req, res) {

    LanguagesFunction.deleteLanguage(req.body, function (value) {
        if (value != null) {
            res.status(201).json(value);
        } else {
            res.status(400).json(value);
        }
    });

});


router.post('/addNewLanguage', function (req, res) {

    LanguagesFunction.addNewLanguage(req.body, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});









module.exports = router;
