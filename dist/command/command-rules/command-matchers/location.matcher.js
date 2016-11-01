"use strict";
var locationMatcher = {
    character: 'at',
    property: 'location',
    parse: function (text) {
        var pieces = text.split(this.character);
        if (pieces[1]) {
            var locationSplit = pieces[1].split('on');
            if (locationSplit[0]) {
                return locationSplit[0].trim();
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
exports.locationMatcher = locationMatcher;
