'use strict'
const express = require('express');
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const uuid = require('uuid');

let app = express();

// Run the context for each request. Assign a unique identifier to each request
app.use(function(req, res, next) {
    req.uniqueId = uuid.v4();
    next();
});

// REQUEST SETTINGS
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false
}));
app.use(bodyParser.json({
    limit: '5mb'
}));

// ROUTING
app.use('/', routes); // requests are handled here
app.use(express.static('public')); // static pages are served
app.get('/', function (req, res) {
    res.send("Hello there :)");
});

// START THE SERVER
let server = app.listen(process.env.PORT || 8080, () => {
    console.log('Listening');
    console.log("Server initialization successful!")
});



