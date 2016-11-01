import { firebaseApp } from '../firebase-app';
import { SlackPost } from '../interfaces';
import { CommandRule, allRules } from './command-rules';

export function command(text: string | SlackPost) {
   if((<SlackPost>text).text) {
      return parseCommand((<SlackPost>text).text, allRules);
   }
}

// export function user(uid: string) {
//    const userRef = firebaseApp.database().ref('users').child(uid);
//    return {
//       update(user: BudgetUser | SlackPost) {
//          if((<SlackPost>user).user_name) {
//             return updateUser(userRef, { username: (<SlackPost>user).user_name })
//          }
//          return updateUser(userRef, user)
//       }
//    };
// }

/**
 * Reads a command from Slack and creates a set of instructions
 */
export function parseCommand(text: string, commandRules: CommandRule[]) {
   const instructions = commandRules.map(rule => {
      if (rule.match(text)) {
         return rule.buildInstructions();
      }
   });
   return instructions;
}

