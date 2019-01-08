// JavaScript Document


$(document).ready(function() {

// load
	// $("header").load("index_header.html");
	$("footer").load("footer.html");

// // full img
// 	$(window).bind('load resize', function() {
// 		re_win();
// 		var r_in = $("div.ch_bg").index();
// 		var top_rs = an_he(r_in);
// 		$("html, body").animate({scrollTop:top_rs},1000);
// 		$("aside").stop().animate({top:top_rs},1000);
// 	});

window.onscroll = function() {scrollFunction()};

	function scrollFunction() {
	  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$("header").css({'top' : '0px'});
	  } else {
		$("header").css({'top' : '-100px'});
	  }
	};

	$(".hamburger").click(function(){
		$("header").css({'top' : '0px'});
	});
	$("#a1,#a2,#a3,#a4,#a5,#a6,#a7").click(function(){
		$(".hamburger").removeClass("is-active");
	});

//Click event to scroll to top
//  $('#S2').offset().top

$('#a1').click(function(){
	$('html, body').animate({scrollTop : 0},1200);
	return false;
});

$('#logo').click(function(){
	$('html, body').animate({scrollTop : 0},1200);
	return false;
});

$('#a2').click(function(){
	$('html, body').animate({scrollTop : 670},1200);
	return false;
});

$('#a3').click(function(){
	$('html, body').animate({scrollTop : 1420},1200);
	return false;
});

$('#a4,#b4').click(function(){
	$('html, body').animate({scrollTop : 2110},1200);
	return false;
});

$('#a5,#b5').click(function(){
	$('html, body').animate({scrollTop : 2790},1200);
	return false;
});

$('#a6').click(function(){
	$('html, body').animate({scrollTop : 3500},1200);
	return false;
});

$('#a7').click(function(){
	$('html, body').animate({scrollTop : 4160},1200);
	return false;
});

$('.intro').eq(0).show();

$('.tip').hover(function(){
	var _index = $(this).index();

	$('.intro').eq(_index).slideDown(200).siblings().slideUp(200);		
	
});	


});