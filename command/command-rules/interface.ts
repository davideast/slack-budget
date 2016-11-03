import { SlackPost } from '../../interfaces';

export interface CommandRule {
   firebaseApp: firebase.app.App;
   matcher: string;
   match(text: string): boolean;
   buildInstruction(post: SlackPost): Promise<CommandInstruction>;
}

export interface CommandInstruction {
   ref: firebase.database.Reference;
   value: any;
   execute(): firebase.Promise<any>;
}