var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var TermlanguagesFunction = require('../Termlanguages/TermlanguagesFunctions');
router.use(bodyParser.json());



router.post('/updateTermlanguages', function (req, res) {

        TermlanguagesFunction.updateTermlanguages(req.body, function (value) {
            if (value != null) {
                res.status(201).json(value);
            } else {
                res.status(400).json(value);
            }
        });



});




router.post('/addActiveLanguage', function (req, res) {

    TermlanguagesFunction.addActiveLanguage(req.body, function (value) {
            if (value != null) {
                res.status(201).json(value);
            } else {
                res.status(400).json(value);
            }
        });


});







router.delete('/removeActiveLanguage', function (req, res) {

        LanguagesFunction.removeActiveLanguage(req.body, function (value) {
            if (value != null) {
                res.status(201).json(value);
            } else {
                res.status(400).json(value);
            }
        });

});



router.delete('/deleteTermlanguage', function (req, res) {

    TermlanguagesFunction.deleteTermlanguage(req.body, function (value) {
            if (value != null) {
                res.status(201).json(value);
            } else {
                res.status(400).json(value);
            }
        });

});



module.exports = router;
