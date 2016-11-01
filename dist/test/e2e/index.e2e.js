"use strict";
var request = require('request-promise');
require('jasmine');
describe('e2e', function () {
    it('should not authenticate with invalid token', function (done) {
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/queue',
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            },
            body: { token: 'aToken' },
            json: true
        };
        request(options).then(function (res) {
            expect(res.status).toEqual(403);
            done();
        });
    });
});
