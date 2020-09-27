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
	
	var url_str = url.value;
	var desc_str = desc.value;
	
	url_str = url_str.split("&").join("&amp;");
	url_str = url_str.split("<").join("&lt;");
	url_str = url_str.split(">").join("&gt;");
	url_str = url_str.split('"').join("&quot;");
	url_str = url_str.split("'").join("&apos;");
	url_str = url_str.split("/").join("&#x2F;");
	
	desc_str = desc_str.split("&").join("&amp;");
	desc_str = desc_str.split("<").join("&lt;");
	desc_str = desc_str.split(">").join("&gt;");
	desc_str = desc_str.split('"').join("&quot;");
	desc_str = desc_str.split("'").join("&apos;");
	desc_str = desc_str.split("/").join("&#x2F;");
	
	var resource = {
		desc: desc_str,
		url: url_str
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
	querySnapshot.forEach((doc) => {
		url = doc.data().url;
		desc = doc.data().desc;
		
		url = url.split("&").join("&amp;");
		url = url.split("<").join("&lt;");
		url = url.split(">").join("&gt;");
		url = url.split('"').join("&quot;");
		url = url.split("'").join("&apos;");
		url = url.split("/").join("&#x2F;");
		
		desc = desc.split("&").join("&amp;");
		desc = desc.split("<").join("&lt;");
		desc = desc.split(">").join("&gt;");
		desc = desc.split('"').join("&quot;");
		desc = desc.split("'").join("&apos;");
		desc = desc.split("/").join("&#x2F;");
		
		$("#resource_table").append('<tr><td><a href="' + url + '" target="_blank">' + url + '</a></td><td><p>' + desc + '</p></td></tr>')
	});
});