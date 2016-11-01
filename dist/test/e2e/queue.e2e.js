"use strict";
var request = require('request-promise');
require('jasmine');
var SLACK_TOKEN = process.env.SLACK_TOKEN;
var PORT = process.env.PORT;
describe('POST /queue', function () {
    describe('Token Authentication', function () {
        it('should not authenticate with invalid token', function (done) {
            makeQueueRequest({ token: 'aToken' }).then(function (res) {
                expect(res.status).toEqual(403);
                done();
            });
        });
        it('should not authenticate with a valid token, but an invalid POST body', function (done) {
            makeQueueRequest({ token: SLACK_TOKEN }).then(function (res) {
                expect(res.status).toEqual(403);
                done();
            });
        });
    });
});
/**
 * Helper function for creating POST requests to /queue
 */
function makeQueueRequest(body) {
    var options = {
        method: 'POST',
        url: "http://localhost:" + PORT + "/queue",
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: body,
        json: true
    };
    return request(options);
}
