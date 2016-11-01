"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var helpers_1 = require('./helpers');
var SLACK_TOKEN = process.env.SLACK_TOKEN;
var app = express();
app.use(bodyParser.json());
app.use(expressValidator([{}]));
/**
 * 1. Check post body params
 * 2.
 */
app.post('/queue', function (req, res) {
    var slackPost = req.body;
    var checkedResponse = helpers_1.checkPostParams(slackPost, SLACK_TOKEN);
    if (checkedResponse) {
        res.send(checkedResponse);
        return;
    }
});
