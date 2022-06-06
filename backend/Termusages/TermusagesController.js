var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const TermusagesFunction = require("../Termusages/TermusagesFunctions");
router.use(bodyParser.json());



router.delete('/deleteTermusage', function (req, res) {

        TermusagesFunction.deleteTermusage(req.body, function (value) {
            if (value != null) {
                res.status(201).json(value);
            } else {
                res.status(400).json(value);
            }
        });

});


router.post('/addNewTermusage', function (req, res) {

        TermusagesFunction.addNewTermusage(req.body, function (value) {
            if (value != null) {
                res.status(201).json(value);
            } else {
                res.status(400).json(value);
            }
        });

});




module.exports = router;
