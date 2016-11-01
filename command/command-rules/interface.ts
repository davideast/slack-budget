export interface CommandRule {
   firebaseApp: firebase.app.App;
   matcher: string;
   match(text: string): boolean;
   buildInstructions(): CommandInstruction;
}

export interface CommandInstruction {
   ref: firebase.database.Reference;
   value: any;
   execute(): firebase.Promise<any>;
}