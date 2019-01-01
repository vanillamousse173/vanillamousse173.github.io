// JavaScript Document


$(document).ready(function() {

	window.onscroll = function() {scrollFunction()};

	function scrollFunction() {
	  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$("header").css({'top' : '0px'});
	  } else {
		$("header").css({'top' : '-100px'});
	  }
	};

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
		$("header").css({'top' : '0px'});
	});
	$("#a1,#a2,#a3,#a4,#a5,#a6,#a7").click(function(){
		$("#menu").toggle(500);
		$(".hamburger").removeClass("is-active");
	});

});