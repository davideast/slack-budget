import { CommandResponse } from '../';
import { CommandInstruction, CommandInstructionOptions } from './'

/**
 * A class to handle the updating of a database and returning the desired result
 * back after the instruction executes.
 */
export abstract class BaseInstruction implements CommandInstruction {

   updateRef?: firebase.database.Reference;
   valueRef: firebase.database.Reference;
   updateValue?: any;

   constructor(options: CommandInstructionOptions) {
      this.updateRef = options.updateRef;
      this.updateValue = options.updateValue;
      this.valueRef = options.valueRef;

      // Ensure `this` is bound to the class instance
      this.execute = this.execute.bind(this);
      this._executeWithUpdateRef = this._executeWithUpdateRef.bind(this);
      this._executeWithValueRef  = this._executeWithValueRef.bind(this);
   }

   abstract response(): firebase.Promise<CommandResponse>;

   /**
    * Begin execution of the instruction. If no updateRef is provided
    * then only the valueRef is retrieved.
    */
   execute(): firebase.Promise<CommandInstruction> {
      if(this.updateRef) {
        return this._executeWithUpdateRef();
      }
      return this._executeWithValueRef();
   }

   /**
    * Helper function for updating the updateRef and then
    * retrieving using the valueRef
    */
   private _executeWithUpdateRef(): firebase.Promise<CommandInstruction> {
     return this.updateRef.update(this.updateValue).then(_ => {
        return this._executeWithValueRef();
      }).then(_ => this);
   }

   /**
    * Helper method to retrieve the value ref value
    */
   private _executeWithValueRef(): firebase.Promise<CommandInstruction> {
     return this.valueRef.once('value').then(_ => this);
   }

}