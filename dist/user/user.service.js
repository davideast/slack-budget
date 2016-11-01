"use strict";
var firebase_app_1 = require('../firebase-app');
function user(uid) {
    var userRef = firebase_app_1.firebaseApp.database().ref('users').child(uid);
    return {
        update: function (user) {
            if (user.user_name) {
                return updateUser(userRef, { username: user.user_name });
            }
            return updateUser(userRef, user);
        }
    };
}
exports.user = user;
function updateUser(userRef, user) {
    return userRef.update(user);
}
exports.updateUser = updateUser;
