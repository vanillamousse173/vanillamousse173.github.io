// JavaScript Document


$(document).ready(function() {

	// Look for .hamburger
		var hamburger = document.querySelector(".hamburger");
	// On click
		hamburger.addEventListener("click", function() {
	// Toggle class "is-active"
		hamburger.classList.toggle("is-active");
	// Do something else, like open/close menu
	});

	$(".hamburger").click(function(){
		$("#menu").toggle(500);
	});
	
	$("#a1,#a2,#a3,#a4,#a5,#a6,#a7").click(function(){
		$("#menu").toggle(500);
	});

});