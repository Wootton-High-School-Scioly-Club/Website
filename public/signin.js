const emailf = document.getElementById("inpute");
const passwordf = document.getElementById("inputp");

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

const provider = new firebase.auth.GoogleAuthProvider();
const signwg = document.getElementById("signwithg");
const auth = firebase.auth();

signwg.onclick = function(){
  firebase.auth().signInWithPopup(provider);
};


auth.onAuthStateChanged(user=>{
	if(user){
    window.location.replace("index.html");
	}
});
