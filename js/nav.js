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
	$(".box").click(function(){
		$("#menu").toggle(500);
		$(".hamburger").removeClass("is-active");
	});

});