var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ApplicationlanguagesFunction = require('../Applicationlanguages/ApplicationlanguagesFunctions');
router.use(bodyParser.json());



router.post('/addActiveLanguage', function (req, res) {

    ApplicationlanguagesFunction.addActiveLanguage(req.body, function (value) {
        if (value != null) {
            res.status(201).json(value);
        } else {
            res.status(400).json(value);
        }
    });

});


router.delete('/removeActiveLanguage', function (req, res) {

    ApplicationlanguagesFunction.removeActiveLanguage(req.body, function (value) {
        if (value != null) {
            res.status(201).json(value);
        } else {
            res.status(400).json(value);
        }
    });

});




module.exports = router;
