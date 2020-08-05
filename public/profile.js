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
    eventref.where("emails", "array-contains", cemail).get().then((eventarr) => {
      eventarr.docs.forEach(function(doc){
        var item = doc.data();
        console.log(item);
        var bigli = document.createElement("li");
        var bigdiv = document.createElement("div");
        var titlt = document.createElement("h2");
        titlt.style.cssFloat = "left";
        var titletext = document.createTextNode(item.name);
        titlt.appendChild(titletext);
        var memla = document.createElement("h4");
        memla.style.cssFloat = "left";
        memla.style.padding = "20px 30px 50px 30px";
        memla.appendChild(document.createTextNode("Members:"));
        var memul = document.createElement("ul");
        memul.style.cssFloat = "left";
        memul.style.padding = "20px 30px 50px 30px";
        item.Members.forEach((itemi, i) => {
          var memli = document.createElement("li");
          memli.appendChild(document.createTextNode(itemi));
          memul.appendChild(memli);
        });
        bigdiv.appendChild(titlt);
        bigdiv.appendChild(document.createElement("br"));
        bigdiv.appendChild(memla);
        bigdiv.appendChild(memul);
        bigli.appendChild(bigdiv);
        eventli.appendChild(bigli);
        var hrtag = document.createElement("hr");
        hrtag.style.cssFloat = "left";
        bigdiv.appendChild(hrtag);
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
    $("#asklogin").hidden = true;

	}else{
    $("#asklogin").hidden = false;
	}
});
