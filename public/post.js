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
        name: postform.querySelector("#nameinput").value,
        text: postform.querySelector("#textinput").value,
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
  tempdiv.querySelector(".namep").textContent = item.name;
  tempdiv.querySelector(".emailp").textContent = '-' + item.email;
  tempdiv.querySelector(".time").textContent = item.time.toDate().toDateString();
  tempdiv.querySelector(".text").textContent = item.text;
  bigiv.prepend(tempdiv);
};
