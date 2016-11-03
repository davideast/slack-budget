import { firebaseApp } from '../firebase-app';
import { SlackPost } from '../interfaces';
import { CommandRule, allRules } from './command-rules';

export function command(post: SlackPost) {
   return parseCommand(post, allRules);
}

/**
 * Reads a command from Slack and creates a set of instructions
 */
export function parseCommand(post: SlackPost, commandRules: CommandRule[]) {
   const instructions = commandRules.map(rule => {
      if (rule.match(post.text)) {
         return rule.buildInstruction(post);
      }
   });
   return instructions[0];
}
