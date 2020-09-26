const emailf = document.getElementById("inpute");
const passwordf = document.getElementById("inputp");
const provider = new firebase.auth.GoogleAuthProvider();
const signwg = document.getElementById("signwithg");

document.querySelector("#signinform").addEventListener("submit", (e) => {
  e.preventDefault();
  var email = emailf.value;
  var password = passwordf.value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    document.querySelector("#errormes").innerHTML = errorMessage;
    // ...
  });
});

signwg.onclick = function(){
  firebase.auth().signInWithPopup(provider);
};


firebase.auth().onAuthStateChanged(user=>{
	if(user){
    window.location.replace("index.html");
	}
});
