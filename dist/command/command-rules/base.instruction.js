"use strict";
var BaseInstruction = (function () {
    function BaseInstruction(options) {
        this.ref = options.ref;
        this.value = options.value;
    }
    BaseInstruction.prototype.execute = function () {
        return this.ref.update(this.value);
    };
    return BaseInstruction;
}());
exports.BaseInstruction = BaseInstruction;
