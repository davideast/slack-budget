import { CommandResponse } from '../'

export interface CommandInstruction {
   updateRef?: firebase.database.Reference;
   updateValue?: any;
   valueRef: firebase.database.Reference;
   execute(): firebase.Promise<CommandInstruction>;
   response(): firebase.Promise<CommandResponse>;
}

export interface CommandInstructionOptions { 
  updateRef?: firebase.database.Reference;
  updateValue?: any;
  valueRef: firebase.database.Reference;
}