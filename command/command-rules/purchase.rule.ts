import { BaseRule } from './';

export class PurchaseRule extends BaseRule {
   matcher: string = '+';

   static create() {
      return new PurchaseRule();
   }

   constructor() {
      super();
   }

   execute() {
      console.log('im a purchase rule!');
   }

}