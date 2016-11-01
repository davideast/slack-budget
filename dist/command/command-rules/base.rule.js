"use strict";
var BaseRule = (function () {
    function BaseRule(firebaseApp) {
        this.firebaseApp = firebaseApp;
    }
    BaseRule.prototype.match = function (text) {
        return this.matcher.startsWith(text.charAt(0));
    };
    return BaseRule;
}());
exports.BaseRule = BaseRule;
