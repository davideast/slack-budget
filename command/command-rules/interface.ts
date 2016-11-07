import { SlackPost, Purchase } from '../../interfaces';
import { CommandInstruction } from './command-instructions';

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

export interface HistoryPurchase extends Purchase {
  leftBudget: number;
  totalBudget: number;
}

