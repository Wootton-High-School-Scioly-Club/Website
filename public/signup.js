const db = firebase.firestore();
const fieldsdiv = document.getElementById("fields");
var inputsid = [], required = [];
var sciencid = [];
var eventsid = [];

let fieldsref;
let aeventref;
let memberref;
let unsubscribe;


const changeColor = (divToChange) => {
  divToChange.style.backgroundColor = "#ffe0e0";
  setTimeout(()=>{
    divToChange.style.backgroundColor = "#ffffff";
  }, 5000);
  divToChange.scrollIntoView();
}

fieldsref = db.collection("LoginFields");
aeventref = db.collection("Event");

var rfields = fieldsref.doc("Canf");
rfields.get().then(function(doc){
  if(doc.exists){
    doc.data().fields.forEach((item, i) => {
      var bigdiv = document.createElement("div");
      //bigdiv.style.padding = "10px";
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
      if(item.required){
        required.push(item.id);
      }
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
      //checkb.style.margin = "0px 0px 0px 60px";
      checkb.setAttribute("id", item.id+'c');
      checkb.setAttribute("type", "checkbox");
      var chelbl = document.createElement("label");
      chelbl.style.margin = "0px 0px 0px 20px";
      sciencid.push(item.id+'c');
      chelbl.appendChild(document.createTextNode(item.name));
      chelbl.setAttribute("for", item.id+"c");
      tempdiv.appendChild(checkb);
      tempdiv.appendChild(chelbl);
      othdiv.appendChild(tempdiv);
    });
    tbd.appendChild(tht);
    tbd.appendChild(othdiv);
    fieldsdiv.appendChild(tbd);
  }
});
db.collection('Event').get().then((doc) => {
  var tbd = document.createElement("div");
  tbd.className = "form-seg";
  tbd.style.padding = "10px";
  var tht = document.createElement("h4");
  tht.className = "leftal";
  tht.appendChild(document.createTextNode("Please choose at least four preferred events:"));
  var thtg = document.createElement("p");
  thtg.className = "gray leftal";
  thtg.innerHTML = "Drag&Drop/Double-tap at least 4 events in the order of your interest. Hover on the box to see a brief description of event.";

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
  firdiv.style.width = "90%";
  firdiv.style.maxWidth = "610px";
  //firdiv.style.height = "110px";
  //firdiv.style.margin = "20px 0px 20px 30px";
  firdiv.style.border = "solid 1px grey";
  //firdiv.style.backgroundColor = "#";
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
  othdiv.style.maxWidth = "610px";


  tbd.appendChild(tht);
  tbd.appendChild(thtg);
  tbd.appendChild(firdiv);
  tbd.appendChild(othdiv);
  fieldsdiv.appendChild(tbd);

  doc.forEach((item, i) => {
    var tempdiv = addeventdiv(othdiv, item.data());

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
    tempdiv.addEventListener("dblclick", () => {
      if(tempdiv.parentElement.id === "ansdiv"){
        othdiv.appendChild(tempdiv);
      }else{
        ansdiv.appendChild(tempdiv);
      }
    });
  });

});


auth.onAuthStateChanged(user => {
  if(user){
    var id = user.uid;
    db.collection("Members").doc(user.uid).get().then((doc) => {
      if(doc.exists){
        const map = new Map(Object.entries(doc.data()));
        inputsid.forEach((item, i) => {
          if(map.has(item)){
            let tempbox = document.querySelector("#" + item);
            if(map.get(item) !== null){
              tempbox.value = map.get(item);
            }
            if(tempbox.type === "checkbox"){
              tempbox.checked = map.get(item);
            }
            if(item === "passwordf" || item === "emailf"){
              tempbox.disabled = true;
            }
          }
        });
        
        map.get("scienceclass").forEach((item, i) => {
          document.getElementById(item).checked = true;
        });
        map.get("preferredeve").forEach((item, i) => {
          document.getElementById("ansdiv").appendChild(document.getElementById(item));
        });

        document.getElementById("titleh1").innerHTML = "Update Your Profile";
        document.getElementById("signup").innerHTML = "Update";
      }else{
        document.getElementById("emailf").value = user.email;
        document.getElementById("passwordf").disabled = true;
        document.getElementById("emailf").disabled = true;
        document.querySelector("#signup").innerHTML = "Create Profile";
      }
    });
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
    if(item[item.length-1] === "f" && item != "statf") {
      // SANITIZE
      tex = tex.split("&").join("&amp;");
      tex = tex.split("<").join("&lt;");
      tex = tex.split(">").join("&gt;");
      tex = tex.split('"').join("&quot;");
      tex = tex.split("'").join("&apos;");
      tex = tex.split("/").join("&#x2F;");
    }
    if(tex.length < 1){
      if(item === "passwordf"){
        if(!user){
          changeColor(document.querySelector("#passwordf").parentElement);
          canprocede = false;
        }
      }else if(required.includes(item)){
        if(document.getElementById(item).type!=="checkbox"){
          changeColor(document.querySelector("#" + item).parentElement);
          canprocede = false;
        }
      }
    }else{
      if(item === "passwordf"){
        if(tex.length < 6 && !user){
          Alert("Password must contain at least 6 characters!", "alert-danger");
        }
        else{
          person.set(item, tex);
        }
      }else{
        person.set(item, tex);
      }
    }
    if(document.querySelector("#" + item).type==="checkbox"){
      if(required.includes(item)){
        if(!document.getElementById(item).checked){
          changeColor(document.querySelector("#" + item).parentElement);
          canprocede = false;
        }
      }
      person.set(item, document.getElementById(item).checked);
    }
  });

  var temparr = [];
  sciencid.forEach((item, i) => {
    if(document.querySelector('#'+item).checked){
      temparr.push(item);
    }
  });
  person.set("scienceclass", temparr);

  var temparr = [];
  var chosenevents = document.getElementById("ansdiv").children;
  if(chosenevents.length < 4){
    changeColor(document.querySelector("#ansdiv"));
    canprocede = false;
  }else{
    for(var a = 0; a < chosenevents.length; a ++){
      temparr.push(chosenevents[a].id);
    }
    person.set("preferredeve", temparr);
  }
  person.set("requpdate", false);
  const obj = Object.fromEntries(person);


  if(canprocede){
    if(user){
      obj.id = user.uid;
      memberref.doc(user.uid).get().then(doc => {
        if(doc.exists){
          memberref.doc(user.uid).update(obj).then(() => {
            Alert("Update successful!", "alert-success");
          }).catch(err => {
            Alert("Something went wrong. Please contact Captain or try again later.", "alert-danger");
          });
        }else{
          obj.team = -1;
          memberref.doc(user.uid).set(obj, {merge: true}).then(() => {
            Alert("Profile created!", "alert-success");
          }).catch(err=>{
            Alert("Something's wrong. Please contact captain or try again later.", "alert-danger");
          });
        }
      });
    }else{
      firebase.auth().createUserWithEmailAndPassword(person.get("emailf"), person.get("passwordf")).then((cred) => {
        obj.team = -1;
        obj.id = cred.user.uid;
        memberref.doc(cred.user.uid).set(obj);
        window.location.replace("index.html");
      }).catch(err => {
        Alert("Something's wrong. Please check if account exist or contact captain.", "alert-danger");
      });
    }
  }else{
    Alert("Please complete all fields.", "alert-danger");
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


function Alert(message, type) {
$('#alert_placeholder').append('<div id="Alert" class="alert ' + type + ' alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span>' + message + ' </span></div>')
	
	setTimeout(function() { // Close the alert in 5 seconds
		$("#Alert").alert('close');
	}, 5000);
}