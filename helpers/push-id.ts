import { firebaseApp } from '../firebase-app';

/**
 * Retrieve a pushId from a Firebase App instance
 */
export function getPushId(app?: firebase.app.App) {
  if(!app) {
    app = firebaseApp;
  }
  return app.database().ref().push().key;
}