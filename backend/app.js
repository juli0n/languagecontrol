var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

var LanguagesController = require('./Languages/LanguagesController');
app.use('/languages', LanguagesController);

var ApplicationsController = require('./Applications/ApplicationsController');
app.use('/applications', ApplicationsController);

var ApplicationlanguagesController = require('./Applicationlanguages/ApplicationlanguagesController');
app.use('/applicationlanguages', ApplicationlanguagesController);

var TermsController = require('./Terms/TermsController');
app.use('/terms', TermsController);

var TermusagesController = require('./Termusages/TermusagesController');
app.use('/termusages', TermusagesController);

var TermlanguagesController = require('./Termlanguages/TermlanguagesController');
app.use('/termlanguages', TermlanguagesController);

var TranslationController = require('./Translation/TranslationController');
app.use('/translation', TranslationController);

module.exports = app;
