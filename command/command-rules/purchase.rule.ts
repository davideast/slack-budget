import { CommandRule, CommandResponse } from './';
import { PurchaseInstruction, CommandInstruction, CommandInstructionOptions } from './command-instructions';
import { firebaseApp } from '../../firebase-app';
import { SlackPost, Purchase } from '../../interfaces';
import { Matcher, matchers } from './command-matchers';
import { createYearMonthId, getPushId } from '../../helpers';

export class PurchaseRule implements CommandRule {
  matcher: string = '+';

  constructor(public firebaseApp: firebase.app.App, public matchers: Matcher[]) { }

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
    const teamId = post.team_id;
    const yearMonthId = createYearMonthId();
    const fanout = this._buildFanout(purchaseId, yearMonthId, post, purchase);
    const rootRef = this.firebaseApp.database().ref();
    const budgetRef = rootRef.child(`amounts/${teamId}/${yearMonthId}`);
    const historyRef = rootRef.child(`history/${teamId}/${purchaseId}`);
    purchase.uid = post.user_id;
    purchase.username = post.user_name;

    return new Promise<PurchaseInstruction>((resolve, reject) => {
      const instruction = new PurchaseInstruction({
        valueRef: historyRef, // history will contain the values needed for the response
        updateRef: rootRef, // update from root due to multi-path updates
        updateValue: fanout
      }, budgetRef, purchase);
      resolve(instruction);
    });
  }

  private _buildFanout(id: string, yearMonthId: string, post: SlackPost, purchase: Purchase) {
    return buildPurchaseFanout(id, yearMonthId, post, purchase);
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

export function buildPurchaseFanout(id: string, yearMonthId: string, post: SlackPost, purchase: Purchase) {
  const purchaseId = id;
  const uid = post.user_id;
  const fanout = {};
  const teamId = post.team_id;

  // Create entry for team's budget on the month
  fanout[`budgets/${teamId}/${yearMonthId}/${purchaseId}`] = purchase;

  // Create an entry for the category's specifics on the month
  fanout[`specifics/${teamId}/${purchase.category}/${yearMonthId}/${purchaseId}`] = purchase;

  // Create an entry for the team's category
  fanout[`categories/${teamId}/${purchase.category}`] = purchase.category;

  // Create an entry for the team's overall history
  fanout[`history/${teamId}/${purchaseId}`] = purchase;

  // Create an entry for the user's overall history
  fanout[`userHistory/${uid}/${purchaseId}`] = purchase;

  return fanout;
}