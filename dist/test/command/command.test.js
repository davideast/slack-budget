"use strict";
var command_1 = require('../../command');
require('jasmine');
describe('commands', function () {
    describe('parseCommand', function () {
        it('should parse a command', function () {
            var instructions = command_1.parseCommand('+specialty $21.03 at Market Hall', command_1.allRules);
            console.log(instructions);
        });
    });
});
/*
```slack
/spent +specialty $21.03 at Market Hall
/spent +eatingout $34.16 at Long Bridge Pizza
/spent +specialty $21.03 at Market Hall on 11/03 6:03pm
/spent +skateboarding $25.00 at Shredquarters
/spent add +football
/spent +football $200 on NFL Sunday Ticket
/spent *current 150.00
/spent How much?
/spent How much +football?
/spent How much is left?
/spent history
 */ 
