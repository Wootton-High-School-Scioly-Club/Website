const db = firebase.firestore();
const fieldsdiv = document.getElementById("fields");
var inputsid = [];
var sciencid = [];
var eventsid = [];

let fieldsref;
let aeventref;
let memberref;
let unsubscribe;


fieldsref = db.collection("LoginFields");
aeventref = db.collection("Event");

var rfields = fieldsref.doc("Canf");
rfields.get().then(function(doc){
  if(doc.exists){
    doc.data().fields.forEach((item, i) => {
      var bigdiv = document.createElement("div");
      bigdiv.style.padding = "10px";
      bigdiv.className = "form-seg";
      var tith = document.createElement("h4");
      tith.className = "leftal";
      tith.appendChild(document.createTextNode(item.description));
      var addh = document.createElement("p");
      addh.className = "leftal fullen";
      addh.className = "gray leftal";
      addh.appendChild(document.createTextNode(item.additional));
      var inpb = document.createElement("input");
      inpb.className = "inpu paddin";
      inpb.setAttribute("type", item.type);
      inpb.setAttribute("placeholder", item.placeholder);
      inpb.setAttribute("id", item.id);
      inputsid.push(item.id);
      bigdiv.appendChild(tith);
      bigdiv.appendChild(addh);
      bigdiv.appendChild(inpb);
      fieldsdiv.appendChild(bigdiv);
      fieldsdiv.appendChild(document.createElement("br"));
    });
  }
});
fieldsref.doc("ScienceClasses").get().then(function (doc){
  if(doc.exists){
    var tbd = document.createElement("div");
    tbd.className = "form-seg";
    tbd.style.padding = "10px";
    var tht = document.createElement("h4");
    tht.className = "leftal";
    tht.appendChild(document.createTextNode("Current and Past Science Classes:"));
    var othdiv = document.createElement("div");
    doc.data().classes.forEach((item, i) => {
      var tempdiv = document.createElement("div");
      var checkb = document.createElement("input");
      checkb.style.margin = "0px 0px 0px 60px";
      checkb.setAttribute("id", item.id);
      checkb.setAttribute("type", "checkbox");
      var chelbl = document.createElement("label");
      chelbl.style.margin = "0px 0px 0px 20px";
      sciencid.push(item.id);
      chelbl.appendChild(document.createTextNode(item.name));
      chelbl.setAttribute("for", item.id);
      tempdiv.appendChild(checkb);
      tempdiv.appendChild(chelbl);
      othdiv.appendChild(tempdiv);
    });
    tbd.appendChild(tht);
    tbd.appendChild(othdiv);
    fieldsdiv.appendChild(tbd);
  }
});
fieldsref.doc("Events").get().then((doc) => {
  if(doc.exists){
    var tbd = document.createElement("div");
    tbd.className = "form-seg";
    tbd.style.padding = "10px";
    var tht = document.createElement("h4");
    tht.className = "leftal";
    tht.appendChild(document.createTextNode("Please choose at least four preferred events:"));

    //create the div that holds the chosen events
    var firdiv = document.createElement("div");
    firdiv.addEventListener("dragover", function(e){
      e.preventDefault();
      const afte = getAftel(firdiv, e.clientX, e.clientY);
      if(afte === null){
        firdiv.appendChild(draggedItem);
      }else{
        firdiv.insertBefore(draggedItem, afte);
      }
    });
    firdiv.addEventListener("dragenter", function(e){
      e.preventDefault();
    });
    firdiv.addEventListener("drop", function(e){
      //firdiv.appendChild(draggedItem);
    });
    firdiv.setAttribute("id", "ansdiv");
    firdiv.style.width = "610px";
    firdiv.style.height = "260px";
    firdiv.style.margin = "20px 0px 20px 30px";
    firdiv.style.border = "solid 1px grey";
    firdiv.style.backgroundColor = "#ddd";
    firdiv.style.borderRadius = "5px";

    //create the box that holds the events
    var othdiv = document.createElement("div");
    othdiv.addEventListener("dragover", function(e){
      e.preventDefault();
      const afte = getAftel(othdiv, e.clientX, e.clientY);
      if(afte === null){
        othdiv.appendChild(draggedItem);
      }else{
        othdiv.insertBefore(draggedItem, afte);
      }
    });
    othdiv.addEventListener("dragenter", function(e){
      e.preventDefault();
    });
    othdiv.addEventListener("drop", function(e){
      //othdiv.appendChild(draggedItem);
    });
    othdiv.style.margin = "20px 0px 20px 30px";
    othdiv.style.width = "610px";


    tbd.appendChild(tht);
    tbd.appendChild(firdiv);
    tbd.appendChild(othdiv);
    fieldsdiv.appendChild(tbd);

    //create fake drag placeholder div.
    const faked = document.createElement("div");
    faked.style.width = "140px";
    faked.style.height = "100px";
    faked.style.margin = "20px 0 0 10px";
    faked.style.border = "solid 1px grey";
    faked.style.borderRadius = "5px";
    faked.style.backgroundColor = "#grey";

    doc.data().Events.forEach((item, i) => {
      var tempdiv = document.createElement("div");
      tempdiv.className = "flexed draggablee";
      tempdiv.setAttribute("id", item.id);
      tempdiv.style.width = "140px";
      tempdiv.style.height = "100px";
      tempdiv.style.margin = "20px 0 0 10px";
      tempdiv.style.border = "solid 1px grey";
      tempdiv.style.borderRadius = "5px";
      tempdiv.style.backgroundColor = "#eeeeee";
      tempdiv.setAttribute("draggable", true);
      var evename = document.createElement("h5");
      evename.style.margin = "0 0 0 5px";
      evename.appendChild(document.createTextNode(item.name));
      tempdiv.appendChild(evename);
      othdiv.appendChild(tempdiv);

      var popupdiv = document.createElement("div");
      popupdiv.setAttribute("id", item.id.concat("popup"));
      popupdiv.hidden = true;
      popupdiv.style.position = "fixed";
      popupdiv.style.left = "20px";
      popupdiv.style.top = "150px";
      popupdiv.style.width = "270px";
      popupdiv.style.padding = "10px";
      popupdiv.style.border = "solid 1px grey";
      popupdiv.style.borderRadius = "5px";
      popupdiv.style.backgroundColor = "#eeeeee";
      var popupnumt = document.createElement("h5");
      popupnumt.className = "adjfont";
      popupnumt.appendChild(document.createTextNode("Team of: ".concat(item.members)));
      var popuptit = document.createElement("h3");
      popuptit.className = "adjfont";
      popuptit.appendChild(document.createTextNode(item.name));
      var popupdeslbl = document.createElement("h5");
      popupdeslbl.className = "adjfont";
      popupdeslbl.appendChild(document.createTextNode("Description:"));
      var popupdes = document.createElement("p");
      popupdes.className = "adjfont";
      popupdes.appendChild(document.createTextNode(item.description));
      popupdiv.appendChild(popuptit);
      popupdiv.appendChild(popupnumt);
      popupdiv.appendChild(popupdeslbl);
      popupdiv.appendChild(popupdes);
      tbd.appendChild(popupdiv);

      tempdiv.onmouseover = function(event){
        popupdiv.hidden = false;
      };
      tempdiv.addEventListener("mouseleave", function(){
        popupdiv.hidden = true;
      });


      var offsetx, offsety;
      //start dragging stuff code
      tempdiv.addEventListener("dragstart", function(e){
        draggedItem = tempdiv;
        //var box = tempdiv.
        tempdiv.classList.add("dragging");
        setTimeout(function(){
          tempdiv.style.opacity = "0.5";
        }, 0);
      });
      tempdiv.addEventListener("dragend", function(){
        tempdiv.classList.remove("dragging");
        setTimeout(function(){
          draggedItem = null;
            tempdiv.style.opacity = "1";
        }, 0);
      });
      tempdiv.addEventListener("drag", function(){

      });
    });

  }
});


auth.onAuthStateChanged(user => {
  if(user){

	}else{

	}
});

document.getElementById("signup").addEventListener("click", () => {
  var user = firebase.auth().currentUser;
  var canprocede = true;
  let person = new Map();
  memberref = db.collection("Members");

  inputsid.forEach((item, i) => {
    var tex = document.getElementById(item).value;
    if(tex.length < 1){
      canprocede = false;
    }else{
      person.set(item, tex);
    }
  });

  var temparr = [];
  sciencid.forEach((item, i) => {
    if(item.checked){
      temparr.push(item);
    }
  });
  person.set("scienceclass", temparr);

  var temparr = [];
  var chosenevents = document.getElementById("ansdiv").children;
  if(chosenevents.length < 4){
    canprocede = false;
  }else{
    for(var a = 0; a < chosenevents.length; a ++){
      temparr.push(chosenevents[a].id);
    }
    person.set("preferredeve", temparr);
  }
  const obj = Object.fromEntries(person);


  if(canprocede){
    if(user){
      memberref.doc(user.uid).set(obj);
    }else{
      memberref.where("emailf", "==", person.get("emailf")).get().then((doc) => {
        if(doc.exists){
          window.alert("Account already exists. Please sign in to update profile.");
        }else{
          firebase.auth().createUserWithEmailAndPassword(person.get("emailf"), person.get("passwordf")).then((cred) => {
            memberref.doc(cred.user.uid).set(obj);
            window.location.replace("index.html");
          });
        }
      });
    }
  }else{
    window.alert("Please complete all fields.");
  }
});


var getAftel = function(containe, mx, my){
  const draggablees = [...containe.querySelectorAll("div.draggablee:not(.dragging)")];


  return draggablees.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = mx - box.left - box.width / 2;
    if(my < (box.top) || my > (box.top + box.height)){
      return closest;
    }else{
      if(offset < 0 && offset > closest.offset){
        return {offset: offset, element: child};
      }else{
        return closest;
      }
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element;
};
