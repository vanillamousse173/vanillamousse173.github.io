// JavaScript Document


$(document).ready(function() {
	
	// load
		// $("header").load("header.html");
		$("footer").load("footer.html");


	// Click event to scroll to top
	$(function(){
		$('a[href*="#"]').on('click', function (e) {
			let target = $($(this).attr('href'));
			if (target && target.length > 0) {
				e.preventDefault();
			}
			$('html, body').animate({
					scrollTop: target.offset().top - 120
				}, 500, 'linear');
		});
	});

});