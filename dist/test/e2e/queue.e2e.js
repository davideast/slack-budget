"use strict";
var request = require('request-promise');
require('jasmine');
var SLACK_TOKEN = process.env.SLACK_TOKEN;
describe('POST /queue', function () {
    describe('Token Authentication', function () {
        it('should not authenticate with invalid token', function (done) {
            makeQueueRequest({ token: 'aToken' }).then(function (res) {
                expect(res.status).toEqual(403);
                done();
            });
        });
        it('should authenticate with a valid token', function (done) {
            makeQueueRequest({ token: SLACK_TOKEN }).then(function (res) {
                expect(res.status).toEqual(200);
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
        url: 'http://localhost:3000/queue',
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: body,
        json: true
    };
    return request(options);
}
