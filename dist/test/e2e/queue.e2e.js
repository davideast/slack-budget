"use strict";
var request = require('request-promise');
require('jasmine');
var SLACK_TOKEN = process.env.SLACK_TOKEN;
describe('POST /queue', function () {
    describe('token authentication', function () {
        it('should not authenticate with invalid token', function (done) {
            makeRequest({ token: 'aToken' }).then(function (res) {
                expect(res.status).toEqual(403);
                done();
            });
        });
        it('should authenticate with a valid token', function (done) {
            makeRequest({ token: SLACK_TOKEN }).then(function (res) {
                expect(res.status).toEqual(200);
                done();
            });
        });
    });
});
function makeRequest(body) {
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
