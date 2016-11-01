"use strict";
var helpers_1 = require('../../helpers');
require('jasmine');
var SLACK_TOKEN = process.env.SLACK_TOKEN;
describe('helpers', function () {
    describe('check-post', function () {
        it('should exist', function () {
            expect(helpers_1.checkPostParams).toBeDefined();
        });
        it('should reject a post with an improper token', function () {
            var badPost = { token: 'badToken' };
            var checkedResponse = helpers_1.checkPostParams(badPost, 'my-token');
            expect(checkedResponse.status).toEqual(403);
        });
        it('should reject a post with no token', function () {
            var badPost = { token: null };
            var checkedResponse = helpers_1.checkPostParams(badPost, 'my-token');
            expect(checkedResponse.status).toEqual(403);
        });
        it('should reject with the proper token but no proper post values', function () {
            var badPost = { token: 'my-token' };
            var checkedResponse = helpers_1.checkPostParams(badPost, 'my-token');
            expect(checkedResponse.status).toEqual(403);
        });
        it('should reject a post a correct token, but with improper values', function () {
            var badPost = {
                token: 'my-token',
                team_id: '1',
                team_domain: 'domain',
                user_name: undefined,
                channel_id: '2',
                channel_name: 'a',
                command: '/spent'
            };
            var checkedResponse = helpers_1.checkPostParams(badPost, 'my-token');
            expect(checkedResponse.status).toEqual(403);
        });
        it('should accept a post with the proper values', function () {
            var goodPost = {
                token: 'my-token',
                team_id: '1',
                team_domain: 'domain',
                user_name: 'alice',
                user_id: '1',
                channel_id: '2',
                channel_name: 'a',
                command: '/spent',
                text: '/spent add *category'
            };
            var checkedResponse = helpers_1.checkPostParams(goodPost, 'my-token');
            expect(checkedResponse.status).toEqual(200);
        });
    });
});
