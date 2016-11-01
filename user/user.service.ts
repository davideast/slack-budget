import { firebaseApp } from '../firebase-app';
import { SlackPost } from '../interfaces';

export interface BudgetUser {
   username?: string;
}

export function user(uid: string) {
   const userRef = firebaseApp.database().ref('users').child(uid);
   return {
      update(user: BudgetUser | SlackPost) {
         if((<SlackPost>user).user_name) {
            return updateUser(userRef, { username: (<SlackPost>user).user_name })
         }
         return updateUser(userRef, user)
      }
   };
}

export function updateUser(userRef: firebase.database.Reference, user: BudgetUser): firebase.Promise<any> {
   return userRef.update(user);
}
