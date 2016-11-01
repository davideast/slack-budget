export interface CommandRule {
   matcher: string;
   match(text: string): boolean;
   execute(): any;
}