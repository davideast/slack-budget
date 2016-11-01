import { firebaseApp } from '../firebase-app';
import { SlackPost } from '../interfaces';
import { CommandRule, allRules } from './command-rules';

export function command(text: string | SlackPost) {

}

/**
 
 + - category
 $ - cost
 at - location
 on - date and time  (now if blank)
 *current - Set new budget for month
 How much? - total spent on month 
 How much +category? - total spent on category this month 
 How much is left? - budget left on month 
 history - lifetime spent
 
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
export function parseCommand(text: string, commandRules: CommandRule[]) {
   commandRules.forEach(rule => {
      if (rule.match(text)) {
         rule.execute();
      }
   });
}