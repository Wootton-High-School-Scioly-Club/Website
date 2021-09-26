
var peoples;
var peopledivs = new Map(), peopleteam = new Map();



const setupui = (user) => {
  if(user.admin){
    let needupdate = [];

    var adminele = document.querySelectorAll('.admin');
    adminele.forEach((item, i) => {
      item.hidden = false;
    });
    
    //firebase.firestore().collection("Event").get().then(doc => {
      //if(doc.exists){
    var divforall = document.querySelector('#eventsdiv');
    divforall.style.maxWidth = "610px";
	  divforall.style.width = "90%";
    divforall.style.margin = "20px auto 20px auto";
    divforall.style.border = "solid 1px grey";
    //divforall.style.backgroundColor = "#ddd";
    divforall.style.borderRadius = "5px";
    divforall.style.paddingBottom = "20px";
    divforall.style.textAlign = "left";

    var formtoadd = document.createElement("form");
    formtoadd.className = "fixedform";
    var labeln = document.createElement("label");
    var inputn = document.createElement("input");
    inputn.className = "paddin";
    labeln.style.marginBottom = "0";
    inputn.style.marginBottom = "10px";
    inputn.setAttribute("type", "text");
    inputn.setAttribute("id", "namei");
    labeln.setAttribute("for", "namei");
    labeln.appendChild(document.createTextNode("Name"));
    formtoadd.appendChild(labeln);
    formtoadd.appendChild(inputn);

    var labeld = document.createElement("label");
    var inputd = document.createElement("input");
    inputd.className = "paddin";
    labeld.style.marginBottom = "0";
    inputd.style.marginBottom = "10px";
    inputd.setAttribute("type", "text");
    inputd.setAttribute("id", "desci");
    labeld.setAttribute("for", "desci");
    labeld.appendChild(document.createTextNode("Description"));
    formtoadd.appendChild(labeld);
    formtoadd.appendChild(inputd);

    var labeli = document.createElement("label");
    var inputi = document.createElement("input");
    inputi.className = "paddin";
    labeli.style.marginBottom = "0";
    inputi.style.marginBottom = "10px";
    inputi.setAttribute("type", "text");
    inputi.setAttribute("id", "idi");
    labeli.setAttribute("for", "idi");
    labeli.appendChild(document.createTextNode("ID"));
    formtoadd.appendChild(labeli);
    formtoadd.appendChild(inputi);

    var labelm = document.createElement("label");
    var inputm = document.createElement("input");
    inputm.className = "paddin";
    labelm.style.marginBottom = "0";
    inputm.style.marginBottom = "10px";
    inputm.setAttribute("type", "number");
    inputm.setAttribute("id", "membi");
    labelm.setAttribute("for", "membi");
    labelm.appendChild(document.createTextNode("Teams of:"));
    formtoadd.appendChild(labelm);
    formtoadd.appendChild(inputm);

    var labelb = document.createElement("label");
    var inputb = document.createElement("input");
    inputb.className = "paddin";
    labelb.style.marginBottom = "0";
    inputb.style.marginBottom = "20px";
    inputb.setAttribute("type", "number");
    inputb.setAttribute("id", "bloci");
    labelb.setAttribute("for", "bloci");
    labelb.appendChild(document.createTextNode("Time Block"));
    formtoadd.appendChild(labelb);
    formtoadd.appendChild(inputb);

    var inputbtn = document.createElement("input");
    inputbtn.className = "btn-primary paddin halfw";
    inputbtn.innerHTML = "Add";
    inputbtn.setAttribute("type", "submit");
    formtoadd.addEventListener("submit", (e) => {
      e.preventDefault();
      var obj = {
        name: inputn.value,
        description: inputd.value,
        block: inputb.value,
        members: inputm.value,
        id: inputi.value,
      };
      db.collection('Event').doc(obj.id).set(obj).then(() => {
        formtoadd.style.visibility = "hidden";
      });
    });
    formtoadd.appendChild(inputbtn);
    var cancelb = document.createElement("button");
    cancelb.innerHTML = "Cancel";
    cancelb.className = "btn-primary paddin halfw";
    cancelb.addEventListener("click", (e) => {
      e.preventDefault();
      formtoadd.style.visibility = "hidden";
    });
    formtoadd.appendChild(cancelb);

    document.querySelector('#addeven').addEventListener("click", () => {
        formtoadd.style.visibility = "visible";
        inputn.value = "";
        inputd.value = "";
        inputi.value = "";
        inputb.value = "";
        inputm.value = "";

        inputi.disabled = false;
        inputbtn.innerHTML = "Add";
    });

    divforall.appendChild(formtoadd);


    let divgrid = document.querySelector("#eventgrid");
    /*
    var labnum = document.createElement("label");
    var inputnum = document.createElement("input");
    inputnum.className = "paddin";
    labnum.style.marginBottom = "0";
    labnum.style.fontSize = "10px";

    inputnum.style.marginBottom = "20px";
    inputnum.style.width = "200px";
    inputnum.setAttribute("type", "number");
    inputnum.setAttribute("id", "teamnum");
    labnum.setAttribute("for", "teamnum");
    labnum.appendChild(document.createTextNode("Number of Teams"));
    divgrid.appendChild(labnum);
    divgrid.appendChild(inputnum);*/
    var tbl = document.createElement("table");

    tbl.style.height = "50px";
    tbl.style.textAlign = "left";
    var hrow = document.createElement("tr");
    hrow.setAttribute("timb", -1);
    hrow.style.height = "50px";
    tblheight = 50;
    var teamnumber = 3;
    tbl.style.maxWidth = (120 + 350 * teamnumber) + "px";
    tbl.style.width = "100%";
  	tbl.style.margin = "auto";
    var lefhead = document.createElement("th");
    lefhead.style.width = "120px";
    lefhead.innerHTML = "Event";
    hrow.appendChild(lefhead);
    for(var a = 0; a < teamnumber; a ++){
      var temphead = document.createElement("th");
      temphead.setAttribute("team", a + 1);
      temphead.addEventListener("click", (e) => {
        setrect(e.target.getAttribute("team"));
      });
      temphead.style.width = "350px";
      temphead.colSpan = "6";
      temphead.innerHTML = "Team " + (a + 1);
      hrow.appendChild(temphead);
    }
    tbl.appendChild(hrow);
    hrow.classList.add("stuck");
    divgrid.appendChild(tbl);

    var colors = ["#FF5555", "#FFA544", "#FFFF00", "#00FF00", "#00BBFF", "#0099FF", "#AA44FF"];
    var teamsarr = [];
    var totpeo = document.querySelector("#totalpeople");
    document.querySelector('#ppopup').style.top = "80px";

    var needchanged = new Map();


    let p1 = firebase.firestore().collection('Event').onSnapshot(doc => {
      let changes = doc.docChanges();
      changes.forEach((item, i) => {
        var tempdoc = item.doc.data();
        if(item.type == 'added'){
          tblheight += 50;
          tbl.style.height = tblheight + "px";
          //For the events
          console.log("called once");
          var tempdiv = addeventdiv(divforall, tempdoc);
          tempdiv.classList.add(tempdoc.id);
          tempdiv.addEventListener("click", () => {
            formtoadd.style.visibility = "visible";
            inputn.value = tempdoc.name;
            inputd.value = tempdoc.description;
            inputi.value = tempdoc.id;
            inputb.value = tempdoc.block;
            inputm.value = parseInt(tempdoc.members);

            inputi.disabled = true;
            inputbtn.innerHTML = "Update";
          });
          //For the table
          var temprow = document.createElement("tr");
          temprow.classList.add(tempdoc.id);
          temprow.setAttribute("timb", tempdoc.block);
          temprow.style.width = (120 + 350 * teamnumber) + "px";
          temprow.style.height = "50px";
          temprow.style.backgroundColor = colors[tempdoc.block];
          var templab = document.createElement("th");
          templab.style.width = "120px";
          templab.innerHTML = tempdoc.name;
          temprow.appendChild(templab);
          for(var a = 0; a < teamnumber; a ++){
            for(var b = 0; b < parseInt(tempdoc.members); b ++){
              var tempd = document.createElement("td");
              tempd.className = (tempdoc.id+(a+1));
              tempd.setAttribute("nameofe", tempdoc.name);
              tempd.setAttribute("team", (a + 1));
              tempd.setAttribute("teamname", tempdoc.id + (a+1));
              tempd.addEventListener("dblclick", (e) => {
                e.target.innerHTML = "";
                needupdate.push(e.target.getAttribute("teamname"));
              });
              tempd.addEventListener("dragover", e => {
                e.preventDefault();
              });
              tempd.addEventListener("dragenter", e => {
                e.preventDefault();
              });
              tempd.addEventListener("drop", e => {
                e.preventDefault();

                e.target.innerHTML = "";
                var cnode = draggedItem.cloneNode(true);
                cnode.style.opacity = 1;
                cnode.style.margin = "0";
                e.target.appendChild(cnode);

                peopleteam.set(cnode.getAttribute("uid"), e.target.getAttribute("team"));
                //start here
                needupdate.push(e.target.getAttribute("teamname"));
              });
              tempd.style.width = (350 / parseInt(tempdoc.members)) + "px";
              tempd.colSpan = (6 / parseInt(tempdoc.members)).toString();
              temprow.appendChild(tempd);
            }
            teamsarr.push((tempdoc.id+(a+1)));
          }
          var inserted = false;
          var childrentbl = tbl.children;
          for(var a = 0; a < childrentbl.length; a ++){
            child = childrentbl[a];
            if(child.getAttribute("timb") > temprow.getAttribute("timb")){
              tbl.insertBefore(temprow, child);
              inserted = true;
              break;
            }
          }
          if(!inserted){
            tbl.appendChild(temprow);
          }
        }
        if(item.type == 'removed'){
          var tempdivs = document.querySelectorAll('.' + tempdoc.id);
          tempdivs.forEach((it, i) => {
            it.parentElement.removeChild(it);
          });
          for(var a = 0; a < teamnumber; a ++){
            teamsarr.remove((tempdoc.id+(a+1)));
          }
        }
        if(item.type == 'modified'){
          console.log("called twice");
          var tempdivs = document.querySelectorAll('.' + tempdoc.id);
          tempdivs.forEach((it, i) => {
            it.parentElement.removeChild(it);
          });
          var tempdiv = addeventdiv(divforall, tempdoc);
          tempdiv.classList.add(tempdoc.id);
          tempdiv.addEventListener("click", () => {
            formtoadd.style.visibility = "visible";
            inputn.value = tempdoc.name;
            inputd.value = tempdoc.description;
            inputi.value = tempdoc.id;
            inputb.value = tempdoc.block;
            inputm.value = parseInt(tempdoc.members);

            inputi.disabled = true;
            inputbtn.innerHTML = "Update";
          });

          var temprow = document.createElement("tr");
          temprow.className = tempdoc.id;
          temprow.setAttribute("timb", tempdoc.block);
          temprow.style.width = (120 + 350 * teamnumber) + "px";
          temprow.style.height = "50px";
          temprow.style.backgroundColor = colors[tempdoc.block];
          var templab = document.createElement("th");
          templab.style.width = "120px";
          templab.innerHTML = tempdoc.name;
          temprow.appendChild(templab);
          for(var a = 0; a < teamnumber; a ++){
            for(var b = 0; b < parseInt(tempdoc.members); b ++){
              var tempd = document.createElement("td");
              tempd.className = (tempdoc.id+(a+1));
              tempd.setAttribute("nameofe", tempdoc.name);
              tempd.setAttribute("team", (a + 1));
              tempd.setAttribute("teamname", tempdoc.id + (a+1));
              tempd.addEventListener("dblclick", (e) => {
                e.target.innerHTML = "";
                needupdate.push(e.target.getAttribute("teamname"));
              });
              tempd.addEventListener("dragover", e => {
                e.preventDefault();
              });
              tempd.addEventListener("dragenter", e => {
                e.preventDefault();
              });
              tempd.addEventListener("drop", e => {
                e.preventDefault();

                e.target.innerHTML = "";
                var cnode = draggedItem.cloneNode(true);
                cnode.style.opacity = 1;
                cnode.style.margin = "0";
                e.target.appendChild(cnode);
                peopleteam.set(cnode.getAttribute("uid"), e.target.getAttribute("team"));
                needupdate.push(e.target.getAttribute("teamname"));
              });
              tempd.style.width = (350 / parseInt(tempdoc.members)) + "px";
              tempd.colSpan = (6 / parseInt(tempdoc.members)).toString();
              temprow.appendChild(tempd);
            }
          }
          var inserted = false;
          var childrentbl = tbl.children;
          for(var a = 0; a < childrentbl.length; a ++){
            child = childrentbl[a];
            if(child.getAttribute("timb") > temprow.getAttribute("timb")){
              tbl.insertBefore(temprow, child);
              inserted = true;
              break;
            }
          }
          if(!inserted){
            tbl.appendChild(temprow);
          }
        }
      });
    });



    let p2 = firebase.firestore().collection('Members').get().then(doc => {
      peoples = doc;
      var requpdate = document.querySelector("#requpdate");
      requpdate.onclick = function(){
        doc.forEach(function(d){
          d.ref.update({
            requpdate: true
          });
        });
      }
      doc.forEach((item, i) => {
        console.log(item.data().admin);
        if(item.data().requpdate) return;
        var tempperson = addPerson(totpeo, item.data());
        var cloneny = tempperson.cloneNode(true);
        cloneny.style.margin = "0";
        peopledivs.set(item.data().id, cloneny);
        peopleteam.set(item.data().id, item.data.team);
        tempperson.addEventListener("dragstart", (e) => {
          draggedItem = tempperson;
          document.querySelector("#ppopup").style.visibility = "hidden";
          draggedItem.style.opacity = "0.5";
        });
        tempperson.addEventListener("dragend", e => {
          draggedItem.style.opacity =  "1";
          setTimeout(() => {
            draggedItem = null;
          }, 0);
        });
      });
    });
    var eventarr;
    let p3 = firebase.firestore().collection('Events').get().then(eventar => {
      eventarr = eventar;
    });
    Promise.all([p1, p2, p3]).then(() => {
      eventarr.forEach((event, i) => {
        var aevent = event.data();
        var thiseventcons = document.querySelectorAll('.' + aevent.id);
        for(var a = 0; a < aevent.memid.length; a ++){
          thiseventcons[a].appendChild(peopledivs.get(aevent.memid[a]).cloneNode(true));
        }
      });
    });

    document.querySelector("#assignt").addEventListener("click", () => {
      needupdate.forEach((item, i) => {
        var surrounddivs = document.querySelectorAll("." + item);
        var tempobj = {
          memid: [],
          memname: [],
          mememail: [],
          id: item,
        };
        surrounddivs.forEach((sdiv, i) => {
          tempobj.name = sdiv.getAttribute("nameofe");
          if(sdiv.firstChild){
            tempobj.memid.push(sdiv.children[0].getAttribute("uid"));
            tempobj.memname.push(sdiv.children[0].firstChild.innerHTML);
            tempobj.mememail.push(sdiv.children[0].getAttribute("email"));
          }
        });
        firebase.firestore().collection('Events').doc(item).set(tempobj);
        console.log("update No." + i);
      });
      needupdate = [];

      peoples.forEach((item, i) => {
        var persondivs = document.querySelector("table").querySelectorAll("." + item.data().id);
        if(persondivs.length > 0){
          //if(persondivs[0].getAttribute("team") !== persondivs[0].parentElement.getAttribute("team")){
          firebase.firestore().collection('Members').doc(item.data().id).update({
            team: parseInt(persondivs[0].parentElement.getAttribute("team")),
          });
        }
      });
    });
    //var unsub = db.collection("LoginFields").dor("Events").
  }
};

const setrect = (teamnum) => {
  document.querySelector("#recommends").innerHTML = "";
  console.log("called");
  for(let [key, value] of peopledivs) {
    if(peopleteam.get(key) === teamnum){
      var clonednode = value.cloneNode(true);
      clonednode.style.margin = "10px 0px 10px 10px";
      clonednode.addEventListener("dragstart", (e) => {
        draggedItem = clonednode;
        document.querySelector("#ppopup").style.visibility = "hidden";
        draggedItem.style.opacity = "0.5";
      });
      clonednode.addEventListener("dragend", e => {
        draggedItem.style.opacity =  "1";
        setTimeout(() => {
          draggedItem = null;
        }, 0);
      });
      document.querySelector("#recommends").appendChild(clonednode);
    }
  }
};
