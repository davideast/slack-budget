import { CommandRule, CommandInstruction, BaseInstruction } from './';
import { firebaseApp } from '../../firebase-app';
import { SlackPost, Purchase } from '../../interfaces';
import { Matcher, matchers } from './command-matchers';
import { createYearMonthId, getPushId } from '../../helpers';

export class PurchaseRule implements CommandRule {
  matcher: string = '+';

  constructor(public firebaseApp: firebase.app.App, public matchers: Matcher[]) {}

  /**
   * Determine if a command begins with the matcher +
   */
  match(text: string) {
    return this.matcher.startsWith(text.charAt(0));
  }

  /**
   * Helper method that injects the default Firebase App and matchers
   */
  static create() {
    return new PurchaseRule(firebaseApp, matchers);
  }

  /**
   * Create a Purchase object from the Slack command
   */
  private _parsePurchase(post: SlackPost) {
    return parsePurchase(post, this.matchers);
  }

  /**
   * Create an instruction from a Slack Post. The instruction creates
   * a fanout object from a purchase, the root reference to save the
   * fanout object, and the reference to retrieve the response to the
   * user. 
   */
  buildInstruction(post: SlackPost): Promise<CommandInstruction> {
    const purchase = this._parsePurchase(post);
    const purchaseId = getPushId();
    const uid = post.user_id;
    const yearMonthId = createYearMonthId();
    const fanout = this._buildFanout(purchaseId, yearMonthId, post, purchase);

    return new Promise<CommandInstruction>((resolve, reject) => {
      const instruction = new BaseInstruction({
        valueRef: this.firebaseApp.database().ref(`history/${uid}/${purchaseId}`),
        updateRef: this.firebaseApp.database().ref(),
        updateValue: fanout,
        response() {
          return new Promise((resolve, reject) => {
            resolve({
              status: 200,
              body: `Saved! You now have $200 left on the month!`
            });
          });
        }
        // response() {
        //   const budgetRef = this.updateRef.child(`amounts/${uid}/${yearMonthId}`);
        //   return budgetRef.once('value')
        //     .then(snap => {
        //       const amount = snap.val();
        //       return {
        //         status: 200,
        //         body: `Saved! You now have ${amount} left on the month!`
        //       };
        //     });
        // }
      });
      resolve(instruction);
    });
  }

  private _buildFanout(id: string, yearMonthId: string, post: SlackPost, purchase: Purchase) {
    const purchaseId = id;
    const uid = post.user_id;
    const fanout = {};
    
    // Create entry for user's budget on the month
    fanout[`budgets/${uid}/${yearMonthId}/${purchaseId}`] = purchase;
    
    // Create an entry for the category's specifics on the month
    fanout[`specifics/${uid}/${purchase.category}/${yearMonthId}/${purchaseId}`] = purchase;
    
    // Create an entry for the user's category
    fanout[`categories/${uid}/${purchase.category}`] = purchase.category;
    
    // Create an entry for the user's overall history
    fanout[`history/${uid}/${purchaseId}`] = purchase;

    return fanout;
  }
}


/**
 * Extract a purchase from a command
 * ex: +specialty $21.03 at Market Hall 
 *  => { category: 'specialty , cost: 21.03, location: 'Market Hall', timestmap: 1478012296989 }
 */
export function parsePurchase(post: SlackPost, matchers: Matcher[]): Purchase {
  const commandText = post.text;
  const parsedCommand = {};
  matchers.forEach(matcher => {
    parsedCommand[matcher.property] = matcher.parse(commandText);
  });
  return parsedCommand as Purchase;
}