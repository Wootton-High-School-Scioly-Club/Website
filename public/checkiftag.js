const signOutBtn = document.querySelector("#SignOutBtn")
const whensignedout = document.getElementById("whensignedout");
const signInBtn = document.getElementById("SignInBtn");

const auth = firebase.auth();

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user=>{
	if(user){
		document.querySelectorAll(".signedin").forEach((item, i) => {
			item.hidden = false;
		});

		whensignedout.hidden = true;

		firebase.firestore().collection('Members').doc(user.uid).get().then(doc => {
			console.log("checked");
			if(!doc.exists){
				document.querySelector("#propmtcreat").hidden = false;
				console.log("done");
			}
		});
	}else{
		whensignedout.hidden = false;
		document.querySelectorAll(".signedin").forEach((item, i) => {
			item.hidden = true;
		});
	}
});


const bod = document.getElementsByTagName("BODY")[0];
bod.onload = function(){
  var user = firebase.auth().currentUser;

  if(user){
		whensignedout.hidden = true;
		document.querySelectorAll(".signedin").forEach((item, i) => {
			item.hidden = false;
		});
	}else{
		whensignedout.hidden = false;
		document.querySelectorAll(".signedin").forEach((item, i) => {
			item.hidden = true;
		});
	}
};
