import { CommandInstruction } from './';

export class BaseInstruction implements CommandInstruction {

   ref: firebase.database.Reference;
   value: any;

   constructor(options: { ref: firebase.database.Reference, value: any }) {
      this.ref = options.ref;
      this.value = options.value;
   }

   execute() {
      return this.ref.update(this.value);
   }

}