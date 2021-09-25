const functions = firebase.functions();
const db = firebase.firestore();
//const admin = require("firebase-admin");

const adminf = document.querySelector('#adminform');
adminf.addEventListener("submit", (e) => {
  e.preventDefault();
  const emaila = document.querySelector('#admine').value;
  const addadmin = functions.httpsCallable('addAdmin');
  addadmin({email: emaila}).then((result) => {
    console.log(result);/*
    db.collection('Members').where('emailf', '==', emaila).update({
      admin: true,
    });*/
    window.alert(result.data.message);
  });
  db.collection("Members").where("emailf", "==", emaila).update({admin: true}).then(() =>{
    window.alert("Finished");
  }).catch(error=>{
    window.alert("Something went wrong");
  });
  console.log(emaila);
});

auth.onAuthStateChanged(user => {
  if(user){
    var need = true;
    user.getIdTokenResult().then(idtoken => {
      user.admin = idtoken.claims.admin;
      setupui(user);
      console.log("done first");
      console.log(user.admin);
    });
  }
});