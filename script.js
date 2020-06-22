var largestCard1;
var largestCard2;

function largestEventCards(){
	var eventCards1 = document.getElementsByClassName("sciolyEventCard");
	var eventCards2 = document.getElementsByClassName("sciolyEventCard2");
	
	largestCard1 = 0;
	largestCard2 = 0;
	
	var height = 0;
	
	for(i=0; i<eventCards1.length; i++){
		if(eventCards1[i].offsetHeight > height){
			height = eventCards1[i].offsetHeight;
			largestCard1 = i;
		}
	}
	
	height = 0;

	for(a=0; a<eventCards2.length; a++){
		if(eventCards2[a].offsetHeight > height){
			height = eventCards2[a].offsetHeight;
			largestCard2 = a;
		}
	}
	
	document.getElementById("collapseOne").classList.remove("show");
	document.getElementById("collapseTwo").classList.remove("show");
}



function eventsCardResize(cardClassName) {
	if(window.innerWidth >= 992) {
		setTimeout(function() {
			var eventCards = document.getElementsByClassName(cardClassName);
			
			if(cardClassName == "sciolyEventCard") {
				var height = eventCards[largestCard1].offsetHeight;
				var exclude = largestCard1;
			}else {
				var height = eventCards[largestCard2].offsetHeight;
				var exclude = largestCard2;
			}
			
			for(a=0; a<eventCards.length; a++){
				if(a != exclude) {
					eventCards[a].style.height = height + "px";
				}
			}
		}, 1);
	}else {
		var eventCards = document.getElementsByClassName(cardClassName);
		
		if(cardClassName == "sciolyEventCard") {
			var exclude = largestCard1;
		}else {
			var exclude = largestCard2;
		}
		
		for(i=0; i<eventCards.length; i++){
			if(i != exclude) {
				eventCards[i].style.height = "100%";
			}
		}
	}
}

window.onresize = function() {
	eventsCardResize("sciolyEventCard");
	eventsCardResize("sciolyEventCard2");
};

window.onload = function() {
	largestEventCards()
}


// Reveal Animation
wow = new WOW({
    animateClass: 'animated',
    offset:       100,
    callback:     function(box){}
    }
);
wow.init();
document.getElementById('moar').onclick = function() {
	var section = document.createElement('section');
	section.className = 'section--purple wow fadeInDown';
	this.parentNode.insertBefore(section, this);
};
