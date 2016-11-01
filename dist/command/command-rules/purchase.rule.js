"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _1 = require('./');
var firebase_app_1 = require('../../firebase-app');
var command_matchers_1 = require('./command-matchers');
var PurchaseRule = (function (_super) {
    __extends(PurchaseRule, _super);
    function PurchaseRule() {
        _super.apply(this, arguments);
        this.matcher = '+';
    }
    PurchaseRule.create = function () {
        return new PurchaseRule(firebase_app_1.firebaseApp);
    };
    PurchaseRule.prototype.parse = function (post) {
        return parseSlackPostCommand(post);
    };
    PurchaseRule.prototype.buildInstructions = function (post) {
        console.log(this.parse(post));
        return new _1.BaseInstruction({
            ref: this.firebaseApp.database().ref(),
            value: '1'
        });
    };
    return PurchaseRule;
}(_1.BaseRule));
exports.PurchaseRule = PurchaseRule;
/**
 * Extract values from a command
 * ex: +specialty $21.03 at Market Hall
 *  => { category: 'specialty , cost: 21.03, location: 'Market Hall', timestmap: now }
 */
function parseSlackPostCommand(post) {
    var commandText = post.text;
    var matchers = [command_matchers_1.categoryMatcher, command_matchers_1.costMatcher, command_matchers_1.locationMatcher, command_matchers_1.dateMatcher];
    var parsedCommand = {};
    matchers.forEach(function (matcher) {
        parsedCommand[matcher.property] = matcher.parse(commandText);
    });
    return parsedCommand;
}
exports.parseSlackPostCommand = parseSlackPostCommand;
