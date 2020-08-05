const emailf = document.getElementById("inpute");
const passwordf = document.getElementById("inputp");
const provider = new firebase.auth.GoogleAuthProvider();
const signwg = document.getElementById("signwithg");

function login(){
  var email = emailf.value;
  var password = passwordf.value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

};


signwg.onclick = function(){
  firebase.auth().signInWithPopup(provider);
};


firebase.auth().onAuthStateChanged(user=>{
	if(user){
    window.location.replace("index.html");
	}
});
