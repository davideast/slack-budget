"use strict";
var firebase = require('firebase');
var express = require('express');
var bodyParser = require('body-parser');
var helpers_1 = require('./helpers');
var SLACK_TOKEN = process.env.SLACK_TOKEN;
var SERVICE_ACCOUNT_PATH = process.env.SERVICE_ACCOUNT_PATH;
var app = express();
var firebaseApp = firebase.initializeApp({
    serviceAccount: 'sa.json',
    databaseURL: 'https://slack-budget.firebaseio.com'
});
app.use(bodyParser.json());
/**
 * 1. Check post body params
 * 2. Write user entry
 */
app.post('/queue', queue);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
function queue(req, res) {
    var slackPost = req.body;
    var checkedResponse = helpers_1.checkPostParams(slackPost, SLACK_TOKEN);
    // If status returns 403, return error to user
    if (checkedResponse) {
        res.json(checkedResponse);
        return;
    }
    // Write user entry
    firebase.database().ref('users').child(slackPost.user_id).update({
        username: slackPost.user_name
    }).catch(function (e) { return console.log(e); });
}
exports.queue = queue;
