import { BaseRule, CommandInstruction, BaseInstruction } from './';
import { firebaseApp } from '../../firebase-app';
import { SlackPost } from '../../interfaces';
import { Matcher, matchers } from './command-matchers';

export class PurchaseRule extends BaseRule {
  matcher: string = '+';

  constructor(public firebaseApp, public matchers: Matcher[]) {
    super(firebaseApp);
  }

  static create() {
    return new PurchaseRule(firebaseApp, matchers);
  }

  parse(post: SlackPost) {
    return parseSlackPostCommand(post, this.matchers);
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
 *  => { category: 'specialty , cost: 21.03, location: 'Market Hall', timestmap: 1478012296989 }
 */
export function parseSlackPostCommand(post: SlackPost, matchers: Matcher[]) {
  const commandText = post.text;
  const parsedCommand = {};
  matchers.forEach(matcher => {
    parsedCommand[matcher.property] = matcher.parse(commandText);
  });
  return parsedCommand;
}