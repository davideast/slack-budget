"use strict";
var dateMatcher = {
    character: 'on',
    property: 'timestamp',
    parse: function (text) {
        // text.split('on')[1].trim().split(' ');
        var pieces = text.split(this.character);
        if (pieces[1]) {
            var rightSide = pieces[1].trim().split(' ');
            if (rightSide[0] && rightSide[1]) {
                var monthDay = rightSide[0];
                var time = rightSide[1];
                // TODO: create date from this
                return new Date().getTime();
            }
            else {
            }
        }
        else {
            // on isn't specified use current time
            return new Date().getTime();
        }
    }
};
exports.dateMatcher = dateMatcher;
