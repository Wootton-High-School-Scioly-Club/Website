const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdmin = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
  }).then(() => {
    return user.uid;
  }).catch(err => {
    return err;
  });
});

exports.deletedu = functions.auth.user().onDelete(user => {
  var idofu = user.uid, emofu = user.email;
  return firebase.firestore().collection('Members').doc(idofu).delete().then(() => {
    console.log("Success! User " + emofu + " doc is cleared. See to it that the events are up to date.");
    return "Success"
  }).catch(e => {
    console.log("There is an incomplete deletion. Email: " + emofu);
    return "error";
  });

});
