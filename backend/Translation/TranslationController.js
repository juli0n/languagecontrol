var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const TranslationFunction = require("../Translation/TranslationFunctions");
router.use(bodyParser.json());


router.get('/getAllApplicationTerms', function (req, res) {

    TranslationFunction.getAllApplicationTerms(req.headers, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});


router.get('/getAllLanguages', function (req, res) {

    TranslationFunction.getAllLanguages(req.headers, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});

module.exports = router;
