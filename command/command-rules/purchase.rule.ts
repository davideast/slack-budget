import { CommandRule, CommandInstruction, BaseInstruction } from './';
import { firebaseApp } from '../../firebase-app';
import { SlackPost, Purchase } from '../../interfaces';
import { Matcher, matchers } from './command-matchers';
import { createYearMonthId } from '../../helpers';

export class PurchaseRule implements CommandRule {
  matcher: string = '+';

  constructor(public firebaseApp: firebase.app.App, public matchers: Matcher[]) {}

  match(text: string) {
    return this.matcher.startsWith(text.charAt(0));
  }

  static create() {
    return new PurchaseRule(firebaseApp, matchers);
  }

  private parsePurchase(post: SlackPost) {
    return parseSlackPostCommand(post, this.matchers);
  }

  buildInstruction(post: SlackPost): Promise<CommandInstruction> {

    const purchase = this.parsePurchase(post);
    const yearMonthId = createYearMonthId();
    const fanout = {};
    // 1. Check amount for current month (if over, send response)
   
    
    fanout[`budgets/${post.user_id}/${yearMonthId}/`]
    // 2. Write to user's current budget
    // 3. Write to category's specifics on the month
    // 4. Write to history



    return new Promise<CommandInstruction>((resolve, reject) => {

    });
    // return new BaseInstruction({
    //   ref: this.firebaseApp.database().ref(),
    //   value: this.parsePurchase(post)
    // });
  }
}


/**
 * Extract values from a command
 * ex: +specialty $21.03 at Market Hall 
 *  => { category: 'specialty , cost: 21.03, location: 'Market Hall', timestmap: 1478012296989 }
 */
export function parseSlackPostCommand(post: SlackPost, matchers: Matcher[]): Purchase {
  const commandText = post.text;
  const parsedCommand = {};
  matchers.forEach(matcher => {
    parsedCommand[matcher.property] = matcher.parse(commandText);
  });
  return parsedCommand as Purchase;
}