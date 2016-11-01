"use strict";
var command_rules_1 = require('./command-rules');
function command(text) {
    if (text.text) {
        return parseCommand(text.text, command_rules_1.allRules);
    }
}
exports.command = command;
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
function parseCommand(text, commandRules) {
    var instructions = commandRules.map(function (rule) {
        if (rule.match(text)) {
            return rule.buildInstructions();
        }
    });
    return instructions;
}
exports.parseCommand = parseCommand;
