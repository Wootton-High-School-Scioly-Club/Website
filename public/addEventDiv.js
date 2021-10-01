var addeventdiv = (bdiv, item) => {
  var tempdiv = document.createElement("div");
  tempdiv.className = "flexed draggablee";
  tempdiv.setAttribute("id", item.id);
  tempdiv.style.width = "140px";
  tempdiv.style.height = "40px";
  tempdiv.style.margin = "10px 0 0 10px";
  tempdiv.style.border = "solid 1px grey";
  tempdiv.style.borderRadius = "5px";
  tempdiv.style.backgroundColor = "#fefefe";
  //tempdiv.style.textAlign = "center";
  tempdiv.setAttribute("draggable", true);
  var evename = document.createElement("h5");
  evename.style.fontSize = "smaller";
  evename.style.margin = "1px 5px 0 5px";
  //evename.style.lineHeight = "40px";
  evename.appendChild(document.createTextNode(item.name));
  tempdiv.appendChild(evename);
  bdiv.appendChild(tempdiv);

  var popupdiv = document.createElement("div");
  popupdiv.setAttribute("id", item.id.concat("popup"));
  popupdiv.hidden = true;
  popupdiv.className = "popupdivs";
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
  bdiv.appendChild(popupdiv);

  tempdiv.onmouseover = function(event){
    popupdiv.hidden = false;
  };
  tempdiv.addEventListener("mouseleave", function(){
    popupdiv.hidden = true;
  });
  return tempdiv;
}


var addPerson = (div, doc) => {
  //Create surrounding div
  var tempdiv = document.createElement("div");
  tempdiv.className = "flexed draggablee";
  tempdiv.classList.add(doc.id);
  tempdiv.setAttribute("draggable", true);
  tempdiv.setAttribute("email", doc.emailf);
  tempdiv.setAttribute("uid", doc.id);
  tempdiv.setAttribute("team", doc.team);
  tempdiv.setAttribute("nameofp", doc.namef);
  tempdiv.style.lineHeight = "11px";
  tempdiv.style.paddingTop = "4px";
  tempdiv.style.width = "100px";
  tempdiv.style.height = "30px";
  tempdiv.style.margin = "10px 0 0 10px";
  tempdiv.style.border = "solid 1px grey";
  tempdiv.style.borderRadius = "5px";
  tempdiv.style.backgroundColor = "#eeeeee";
  switch(doc.team){
    case 1:
      tempdiv.style.backgroundColor = "#F0FFFF";
      break;
    case 2:
      tempdiv.style.backgroundColor = "#FFEBCD";
      break;
    case 3:
      tempdiv.style.backgroundColor = "#00FFFF";
      break;
  }
  tempdiv.setAttribute("draggable", true);

  var memname = document.createElement("p");
  memname.style.margin = "0 0 0 5px";
  memname.style.fontSize = "small";
  memname.appendChild(document.createTextNode(doc.namef));
  tempdiv.appendChild(memname);
  div.appendChild(tempdiv);

  tempdiv.onmouseover = () => {
    document.querySelector("#ppopup").style.visibility = "visible";
    document.querySelector("#ppopupname").innerText = doc.namef;
    document.querySelector("#popupgrade").innerText = doc.gradef;
    document.querySelector("#popupema").innerText = doc.emailf;
    document.querySelector("#popupteam").innerText = doc.team;
    document.querySelector("#popuppart").innerText = doc.partnerf;
    document.querySelector("#popupstat").innerText = doc.statf;
    document.querySelector("#popuppho").innerText = (doc.canphoto);
    document.querySelector("#popupaward").innerText = doc.awardf;
    document.querySelector("#popupphysics").innerText = (doc.PhysicsScore);
    document.querySelector("#popupchem").innerText = (doc.ChemScore);
    document.querySelector("#popupbio").innerText = (doc.BioScore);
    var tempstr = "";
    doc.scienceclass.forEach((item, i) => {
      tempstr = tempstr + item;
      tempstr = tempstr + ", ";
    });
    document.querySelector("#popupsci").innerHTML = tempstr;
    tempstr = "";
    doc.preferredeve.forEach((item, i) => {
      tempstr += item;
      tempstr += ", ";
    });
    document.querySelector("#popuppe").innerHTML = tempstr;
    document.querySelector("#popupnum").innerHTML = document.querySelector("table").getElementsByClassName(doc.id).length;
  }
  tempdiv.addEventListener("mouseleave", () => {
    document.querySelector("#ppopup").style.visibility = "hidden";
  });

  return tempdiv;
}
