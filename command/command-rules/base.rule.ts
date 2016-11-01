import { CommandRule } from './';

export abstract class BaseRule implements CommandRule {
   matcher: string;
   match(text: string) {
      return this.matcher.startsWith(text.charAt(0));
   }
   abstract execute();
}