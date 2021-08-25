const functions = firebase.functions;
//functions.useFunctionsEmulator('http://localhost:5001');
var db = firebase.firestore();

var user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(user => {
  if(user == null){
	var remove = document.getElementById("addResourceDropdownBtn");
	remove.parentNode.removeChild(remove);
  }
});

// Add Resource
$("#addResourceBtn").click(function(){
	var desc = document.getElementById("resourceInputDescription");
	var url = document.getElementById("resourceInputURL");
	
	var resource = {
		desc: desc.value,
		url: url.value
	}
	
	desc.value = '';
	url.value = '';
	
	$(".collapse").collapse("hide")
	
	if(resource.desc != "" && resource.url != "") {
		addResourceToDatabase(resource);
	}
});

function addResourceToDatabase(resource) {
	if (firebase.auth().currentUser != null) {
		db.collection("Resources").add(resource)
		.then(function(docRef) {
			$("#resource_table").append('<tr><td><a href="' + resource.url + '" target="_blank">' + resource.url + '</a></td><td><p>' + resource.desc + '</p></td></tr>')
			Alert("Resource Added", "alert-success");
		})
		.catch(function(error) {
			Alert("Error Adding Resource", "alert-danger");
		});
	}
	else {
		Alert("Please log in to add resources.", "alert-danger");
	}
}

function Alert(message, type) {
$('#alert_placeholder').append('<div id="Alert" class="alert ' + type + ' alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span>' + message + ' </span></div>')
	
	setTimeout(function() { // Close the alert in 5 seconds
		$("#Alert").alert('close');
	}, 5000);
}


//Load Resources
db.collection("Resources").get().then((querySnapshot) => {
	var table = document.getElementById("resource_table");
	querySnapshot.forEach((doc) => {
		url = doc.data().url;
		desc = doc.data().desc;

		var row = table.insertRow();

		var url_cell = document.createElement("a");
		url_cell.target = "_blank";
		url_cell.href = url;
		url_cell.textContent = url;

		var desc_cell = document.createElement("p");
		desc_cell.textContent = desc;

		row.insertCell().appendChild(url_cell);
		row.insertCell().appendChild(desc_cell);
	});
});
