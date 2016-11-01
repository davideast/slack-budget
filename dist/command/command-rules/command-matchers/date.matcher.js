"use strict";
var dateMatcher = {
    character: '$',
    property: 'timestamp',
    parse: function (text) {
        var pieces = text.split(this.character);
        if (pieces[1]) {
            var rightSide = pieces[1].split(' ');
            if (rightSide[0]) {
                return rightSide[0].trim();
            }
            else {
                return new Date().getTime();
            }
        }
        else {
            throw new Date().getTime();
        }
    }
};
exports.dateMatcher = dateMatcher;
