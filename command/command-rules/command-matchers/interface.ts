
export interface Matcher {
   character: string;
   parse(text: string): any;
   property: string;
}