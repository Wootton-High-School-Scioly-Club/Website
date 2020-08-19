const db = firebase.firestore();
const eventli = document.getElementById("eventl");

let eventref;
let userref;
let unsubscribe;

var user = firebase.auth().currentUser;
console.log("Hello World");


auth.onAuthStateChanged(user => {
  if(user){
    eventref = db.collection('Events');
    userref = db.collection("Members");
    var cemail = user.email;
    eventref.where("mememail", "array-contains", cemail).get().then((eventarr) => {
      eventarr.docs.forEach(function(doc){
        var item = doc.data();
        console.log(item);
        var bigli = document.createElement("li");
        var bigdiv = document.createElement("div");
        bigdiv.className = "sevenw";
        //bigdiv.center(horizontal);
        var titlt = document.createElement("h2");
        titlt.className = "leftal";
        var titletext = document.createTextNode(item.name);
        titlt.appendChild(titletext);
        var memla = document.createElement("h4");
        memla.className = "leftal";
        memla.style.padding = "10px 0px 5px 20px";
        memla.appendChild(document.createTextNode("Members:"));
        var memul = document.createElement("ul");
        memul.className = "leftal";
        memul.style.padding = "0px 0px 50px 70px";
        item.memname.forEach((itemi, i) => {
          var memli = document.createElement("li");
          memli.appendChild(document.createTextNode(itemi));
          memul.appendChild(memli);
        });
        bigdiv.appendChild(titlt);
        bigdiv.appendChild(memla);
        bigdiv.appendChild(memul);
        bigli.appendChild(bigdiv);
        eventli.appendChild(bigli);
        bigdiv.appendChild(document.createElement("hr"));
        /*
        var str = "<li><h3>" + docd.Name + "</h3><h4>Teammates:</h4>";
        docd.Members.forEach(function(nameofm){
          str = str.concat("<h5>");
          str = str.concat(nameofm);
          str = str.concat("</h5><br>");
        });
        str = str.concat("<br><hr>");
        $('eventli').append(str);*/
      });
    });
    document.getElementById("asklogin").hidden = true;
    document.getElementById("updatep").hidden = false;
	}else{
    document.getElementById("asklogin").hidden = false;
    document.getElementById("updatep").hidden = true;
	}
});
