const db = firebase.firestore();
const fieldsdiv = $("#fields")

let fieldsref;
let aeventref;
let unsubscribe;

var user = firebase.auth().currentUser;

if(!user){
  fieldsref = db.collection("LoginFields");
  aeventref = db.collection("Event");

  var rfields = fieldsref.doc("Canf");
  refields.get().then(function(doc){
    if(doc.exists){
      doc.data().Fields.forEach((item, i) => {
        var bigdiv = document.createElement("div");
        bigdiv.style.padding = "10px";
        bigdiv.className = "form-seg";
        var tith = document.createElement("h4");
        tith.style.cssFloat = "left";
        tith.appendChild(document.createTextNode(item.desciption));
        var addh = document.createElement("p");
        addh.style.cssFloat = "left";
        addh.className = "gray";
        addh.appendChild(document.createTextNode(item.additional));
        var inpb = document.createElement("input");
        inpb.style.cssFloat = "left";
        inpb.setAttribute("type", item.type);
        inpb.setAttribute("placeholder", item.placeholder);
        inpb.setAttribute("id", item.id);
        bigdiv.appendChild(tith);
        bigdiv.appendChild(addh);
        bigdiv.appendChild(inpb);
        fieldsdiv.appendChild(bigdiv);
      });

      var tbd = document.createElement(div);
      tbd.className = "form-seg";
      tbd.style.padding = "10px";
      var tht = document.createElement("h4");
      tht.appendTextNode(document.createTextNode("Current and Past Science Classes:"));
      tht.style.cssfloat = "left";
      var othdiv = document.createElement("div");
      doc.data().ScienceClasses.forEach((item, i) => {
        var checkb = document.createElement("input");
        checkb.style.cssFloat = "left";
        checkb.setAttribute("id", item.id)
        checkb.setAttribute("type", "checkbox");
        var chelbl = document.createElement("label");
        chelbl.appendChild(document.createTextNode(item.name));
        chelbl.setAttribute("for", item.id);
        othdiv.appendChild(checkb);
        othdiv.appendChild(chelbl);
      });
      tbd.appendChild(tht);
      tbd.appendChild(othdiv);
      fieldsdiv.appendChild(tbd);

      }
  });
  fieldsref.doc("ScienceClasses").get().then(function(doc){
    if(doc.exists){

    }
  });

  eventref.where("Membersid", "array-contains", uid).get().then(function(eventarr){
    eventarr.forEach(function(doc){
      var str = "<li><h3>" + doc.Name + "</h3><h4>Teammates:</h4>";
      doc.Members.forEach(function(nameofm){
        str = str.concat("<h5>");
        str = str.concat(nameofm);
        str = str.concat("</h5><br>");
      });
      str = str.concat("<br><hr>");
      $('eventli').append(str);
    });
  });
}else{
	$('fields').append('');
}


auth.onAuthStateChanged(user => {
  if(user){

	}else{

	}
});
