"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var token = process.env.SLACK_TOKEN;
var app = express();
app.use(bodyParser.json());
//app.use(expressValidator([{}]));
app.post('/queue', function (req, res) {
    var slackPost = req.body;
    res.send('Got a POST request');
});
