"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _1 = require('./');
var firebase_app_1 = require('../../firebase-app');
var PurchaseRule = (function (_super) {
    __extends(PurchaseRule, _super);
    function PurchaseRule() {
        _super.apply(this, arguments);
        this.matcher = '+';
    }
    PurchaseRule.create = function () {
        return new PurchaseRule(firebase_app_1.firebaseApp);
    };
    PurchaseRule.prototype.buildInstructions = function () {
        return new _1.BaseInstruction({
            ref: this.firebaseApp.database().ref(),
            value: '1'
        });
    };
    return PurchaseRule;
}(_1.BaseRule));
exports.PurchaseRule = PurchaseRule;
