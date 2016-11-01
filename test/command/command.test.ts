import { SlackPost } from '../../interfaces';
import { PurchaseRule, parseCommand, allRules } from '../../command';
import 'jasmine';

describe('commands', () => {

   describe('parseCommand', () => {

      it('should parse a command', () => {

         const instructions = parseCommand({
            text: '+specialty $21.03 at Market Hall'
         } as SlackPost , allRules);
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