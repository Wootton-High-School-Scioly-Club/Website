const functions = firebase.functions();
functions.useFunctionsEmulator('http://localhost:5001');
const db = firebase.firestore();

const adminf = document.querySelector('#adminform');
adminf.addEventListener("submit", (e) => {
  e.preventDefault();
  const emaila = document.querySelector('#admine').value;
  const addadmin = functions.httpsCallable('addAdmin');
  addadmin({email: emaila}).then((result) => {
    console.log(result);
  });
});

auth.onAuthStateChanged(user => {
  if(user){
    user.getIdTokenResult().then(idtoken => {
      user.admin = idtoken.claims.admin;
      setupui(user);
    });
  }
});
