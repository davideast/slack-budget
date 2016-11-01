import { CommandRule, CommandInstruction } from './';


export abstract class BaseRule implements CommandRule {
   matcher: string;
   constructor(public firebaseApp: firebase.app.App) {}
   match(text: string) {
      return this.matcher.startsWith(text.charAt(0));
   }
   abstract buildInstructions(): CommandInstruction;
}