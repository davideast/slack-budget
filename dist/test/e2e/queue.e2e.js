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
        it('should authenticate with a valid token and with a valid POST body', function (done) {
            var goodPost = {
                token: SLACK_TOKEN,
                team_id: '1',
                team_domain: 'domain',
                user_name: 'alice',
                user_id: '1',
                channel_id: '2',
                channel_name: 'a',
                command: '/spent',
                text: '/spent add *category'
            };
            makeQueueRequest(goodPost).then(function (res) {
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
