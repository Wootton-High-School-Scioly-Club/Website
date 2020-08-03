const whensignedin = document.getElementById("whensignedin");
const whensignedout = document.getElementById("whensignedout");
const signInBtn = document.getElementById("SignInBtn");
const signOutBtn = document.getElementById("SignOutBtn");

const auth = firebase.auth();

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user=>{
	if(user){
		document.getElementById("whensignedinb").hidden = false;
		whensignedin.hidden = false;
		whensignedout.hidden = true;
	}else{
		document.getElementById("whensignedinb").hidden = true;
		whensignedin.hidden = true;
		whensignedout.hidden = false;
	}
});


const bod = document.getElementsByTagName("BODY")[0];
bod.onload = function(){
  var user = firebase.auth().currentUser;

  if(user){
		document.getElementById("whensignedinb").hidden = false;
		whensignedin.hidden = false;
		whensignedout.hidden = true;
	}else{
		document.getElementById("whensignedinb").hidden = true;
		whensignedin.hidden = true;
		whensignedout.hidden = false;
	}
};
