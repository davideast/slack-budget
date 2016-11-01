"use strict";
// +category 
var categoryMatcher = {
    character: '+',
    property: 'category',
    parse: function (text) {
        var pieces = text.split(this.character);
        if (pieces[1]) {
            var rightSide = pieces[1].split(' ');
            if (rightSide[0]) {
                return rightSide[0].trim();
            }
            else {
                throw new Error('Invalid command format');
            }
        }
        else {
            throw new Error('Invalid command format');
        }
    }
};
exports.categoryMatcher = categoryMatcher;
