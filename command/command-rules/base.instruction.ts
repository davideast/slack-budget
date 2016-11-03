import { CommandInstruction, CommandInstructionOptions } from './';

/**
 * A class to handle the updating of a database and returning the desired result
 * back after the instruction executes.
 */
export class BaseInstruction implements CommandInstruction {

   updateRef?: firebase.database.Reference;
   valueRef: firebase.database.Reference;
   updateValue?: any;
   response?(): firebase.Promise<any>;

   constructor(options: CommandInstructionOptions) {
      this.updateRef = options.updateRef;
      this.updateValue = options.updateValue;
      this.valueRef = options.valueRef;
      this.response = options.response;
   }

   /**
    * Begin execution of the instruction. If no updateRef is provided
    * then only the valueRef is retrieved.
    */
   execute(): firebase.Promise<any> {
      if(this.updateRef) {
        return this._executeWithUpdateRef();
      }
      return this._executeWithValueRef();
   }

   /**
    * Helper function for updating the updateRef and then
    * retrieving using the valueRef
    */
   private _executeWithUpdateRef() {
     return this.updateRef.update(this.updateValue).then(_ => {
        return this._executeWithValueRef();
      });
   }

   /**
    * Helper method to retrieve the value ref value
    */
   private _executeWithValueRef() {
     return this.valueRef.once('value');
   }

}