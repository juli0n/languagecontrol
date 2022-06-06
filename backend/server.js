var express = require('express');
var app = require('./app');
const path = require("path");



var port = process.env.PORT || 9000;

var server = app.listen(port, function () {
    const all_routes = require('express-list-endpoints');
    console.log('Backendserver ist erreichbar auf dem Port ' + port);
    console.log(all_routes(app));
});
