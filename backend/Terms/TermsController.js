var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const TermsFunction = require("../Terms/TermsFunctions");
router.use(bodyParser.json());



router.get('/getAllTerms', function (req, res) {

    TermsFunction.getAllTerms(req.headers, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});


router.get('/getAllNotActivatedLanguages', function (req, res) {

    TermsFunction.getAllNotActivatedLanguages(req.headers, function (value) {
        if (value != null) {
            res.json(value);
        } else {
            res.status(400).json(value);
        }
    });

});



router.post('/addNewTerm', function (req, res) {

        TermsFunction.addNewTerm(req.body, function (value) {
            if (value != null) {
                res.status(201).json(value);
            } else {
                res.status(400).json(value);
            }
        });

});



router.delete('/deleteTerm', function (req, res) {

        TermsFunction.deleteTerm(req.body, function (value) {
            if (value != null) {
                res.status(201).json(value);
            } else {
                res.status(400).json(value);
            }
        });

});





module.exports = router;
