"use strict";
function isEmpty(value) {
    return (value == null || value.length === 0);
}
/** Inspects post body from the Slack Slash Command API for proper params
 */
function checkPostParams(slackPost, SLACK_TOKEN) {
    var slackPostKeys = ['token', 'text', 'user_id', 'user_name', 'team_id'];
    var errors = slackPostKeys.map(function (key) {
        var value = slackPost[key];
        if (isEmpty(value)) {
            return "Invalid Slack " + key;
        }
    }).filter(function (error) { return error != undefined; });
    if (slackPost.token !== SLACK_TOKEN) {
        errors.push('Not authorized');
    }
    if (errors.length > 0) {
        return {
            status: 403,
            body: errors.join(', ')
        };
    }
    return {
        status: 200
    };
}
exports.checkPostParams = checkPostParams;
