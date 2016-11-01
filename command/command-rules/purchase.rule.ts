import { BaseRule, CommandInstruction, BaseInstruction } from './';
import { firebaseApp } from '../../firebase-app';

export class PurchaseRule extends BaseRule {
   matcher: string = '+';

   static create() {
      return new PurchaseRule(firebaseApp);
   }

   buildInstructions(): CommandInstruction {
      return new BaseInstruction({
         ref: this.firebaseApp.database().ref(),
         value: '1'
      });
   }

}