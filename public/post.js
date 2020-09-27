const db = firebase.firestore();
const eventli = document.getElementById("eventl");

let unsubscribe;


var user = firebase.auth().currentUser;
var postform = document.querySelector("#writepostf");

auth.onAuthStateChanged(user => {
  if(user){
    unsubscribe = db.collection('Posts').orderBy('time').onSnapshot(doc => {
      let changes = doc.docChanges();
      changes.forEach((item, i) => {
        if(item.type === "added"){
          inflatePost(item.doc.data(), user);
        }
      });
    });

    postform.hidden = false;
    postform.addEventListener("submit", (e) => {
      e.preventDefault();
      var obj = {
        name: sanitize(postform.querySelector("#nameinput").value),
        text: sanitize(postform.querySelector("#textinput").value),
        id: user.uid,
        time: firebase.firestore.Timestamp.fromMillis(Date.now()),
        email: user.email,
      }
      db.collection('Posts').add(obj);
    });

    document.getElementById("asklogin").hidden = true;
    document.getElementById("updatep").hidden = false;
	}else{
    document.getElementById("asklogin").hidden = false;
    document.getElementById("updatep").hidden = true;
    postform.hidden = true;
    unsubscribe();
	}
});

let template = document.querySelector('#template').cloneNode(true);
template.hidden = false;
template.removeAttribute("id");

let bigiv = document.querySelector('#postsdiv');


let inflatePost = (item, user) => {
  var tempdiv = template.cloneNode(true);
  tempdiv.querySelector(".namep").innerHTML = sanitize(item.name);
  tempdiv.querySelector(".emailp").innerHTML = '-' + sanitize(item.email);
  tempdiv.querySelector(".time").innerHTML = item.time.toDate().toDateString();
  tempdiv.querySelector(".text").innerHTML = sanitize(item.text);
  bigiv.prepend(tempdiv);
};

function sanitize(input) {
	input = input.split("&").join("&amp;");
	input = input.split("<").join("&lt;");
	input = input.split(">").join("&gt;");
	input = input.split('"').join("&quot;");
	input = input.split("'").join("&apos;");
	input = input.split("/").join("&#x2F;");

	return input;
}