import * as firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  // serviceAccount: 'sa.json',
  databaseURL: 'https://slack-budget.firebaseio.com'
});

export { firebaseApp };