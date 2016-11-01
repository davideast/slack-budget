"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var helpers_1 = require('./helpers');
var user_1 = require('./user');
var SLACK_TOKEN = process.env.SLACK_TOKEN;
var SERVICE_ACCOUNT_PATH = process.env.SERVICE_ACCOUNT_PATH;
var PORT = process.env.PORT;
var app = express();
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
    // Write user entry
    user_1.user(slackPost.user_id).update(slackPost)
        .then(function (_) {
        // return command(slackPost).parse();
    })
        .then(function (instructions) {
        instructions.map(function (instruction) { return instruction.execute(); });
    });
    res.json(checkedResponse);
    return;
}
exports.queue = queue;
