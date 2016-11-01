"use strict";
var firebase = require('firebase');
var express = require('express');
var bodyParser = require('body-parser');
var helpers_1 = require('./helpers');
var SLACK_TOKEN = process.env.SLACK_TOKEN;
var SERVICE_ACCOUNT_PATH = process.env.SERVICE_ACCOUNT_PATH;
var PORT = process.env.PORT;
var app = express();
var firebaseApp = firebase.initializeApp({
    // serviceAccount: 'sa.json',
    databaseURL: 'https://slack-budget.firebaseio.com'
});
app.use(bodyParser.json());
/**
 * 1. Check post body params
 * 2. Write user entry
 */
app.post('/queue', queue);
app.listen(PORT, function () {
    console.log("Example app listening on port " + PORT + "!");
});
function queue(req, res) {
    var slackPost = req.body;
    var checkedResponse = helpers_1.checkPostParams(slackPost, SLACK_TOKEN);
    // If status returns 403, return error to user
    if (checkedResponse.status === 403) {
        res.json(checkedResponse);
        return;
    }
    var userRef = firebaseApp.database().ref('users').child(slackPost.user_id);
    // Write user entry
    userRef.update({
        username: slackPost.user_name
    });
    res.json(checkedResponse);
}
exports.queue = queue;
