import { SlackPost } from '../../interfaces';

export interface CommandResponse {
  status: number;
  body: string | any;
}

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
   execute(): firebase.Promise<CommandInstruction>;
   response?(): firebase.Promise<CommandResponse>;
}

export interface CommandInstructionOptions { 
  updateRef?: firebase.database.Reference;
  updateValue?: any;
  valueRef: firebase.database.Reference;
  response?(): firebase.Promise<any>;
}


