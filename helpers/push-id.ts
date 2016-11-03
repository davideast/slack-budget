import { firebaseApp } from '../firebase-app';
export function getPushId(app?: firebase.app.App) {
  if(!app) {
    app = firebaseApp;
  }
  return app.database().ref().push().key;
}