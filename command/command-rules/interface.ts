import { SlackPost } from '../../interfaces';

export interface CommandRule {
   firebaseApp: firebase.app.App;
   matcher: string;
   match(text: string): boolean;
   buildInstruction(post: SlackPost): Promise<CommandInstruction>;
}

export interface CommandInstruction {
   updateRef?: firebase.database.Reference;
   updateValue?: any;
   valueRef: firebase.database.Reference;
   execute(): firebase.Promise<any>;
   response?(): firebase.Promise<any>;
}

export interface CommandInstructionOptions { 
  updateRef?: firebase.database.Reference;
  updateValue?: any;
  valueRef: firebase.database.Reference;
  response?(): firebase.Promise<any>;
}


