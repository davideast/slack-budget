import { BaseRule, CommandInstruction, BaseInstruction } from './';
import { firebaseApp } from '../../firebase-app';
import { SlackPost } from '../../interfaces';
import { Matcher, categoryMatcher, costMatcher, dateMatcher, locationMatcher } from './command-matchers';

export class PurchaseRule extends BaseRule {
  matcher: string = '+';

  static create() {
    return new PurchaseRule(firebaseApp);
  }

  parse(post: SlackPost) {
    return parseSlackPostCommand(post);
  }

  buildInstructions(post: SlackPost): CommandInstruction {
    console.log(this.parse(post));
    return new BaseInstruction({
      ref: this.firebaseApp.database().ref(),
      value: '1'
    });
  }

}

/**
 * Extract values from a command
 * ex: +specialty $21.03 at Market Hall 
 *  => { category: 'specialty , cost: 21.03, location: 'Market Hall', timestmap: now }
 */
export function parseSlackPostCommand(post: SlackPost) {
  const commandText = post.text;
  const matchers = [categoryMatcher, costMatcher, locationMatcher, dateMatcher];
  const parsedCommand = {};
  matchers.forEach(matcher => {
    parsedCommand[matcher.property] = matcher.parse(commandText);
  });

  return parsedCommand;
}