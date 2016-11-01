"use strict";
var firebase = require('firebase');
var firebaseApp = firebase.initializeApp({
    // serviceAccount: 'sa.json',
    databaseURL: 'https://slack-budget.firebaseio.com'
});
exports.firebaseApp = firebaseApp;
