// JavaScript Document


$(document).ready(function() {

// load
	// $("header").load("index_header.html");
	$("#puzzle").load("puzz.html");

// // full img
// 	$(window).bind('load resize', function() {
// 		re_win();
// 		var r_in = $("div.ch_bg").index();
// 		var top_rs = an_he(r_in);
// 		$("html, body").animate({scrollTop:top_rs},1000);
// 		$("aside").stop().animate({top:top_rs},1000);
// 	});

//Click event to scroll to top
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
	$('html, body').animate({scrollTop : 1460},1200);
	return false;
});

$('#a4').click(function(){
	$('html, body').animate({scrollTop : 2200},1200);
	return false;
});

$('#a5').click(function(){
	$('html, body').animate({scrollTop : 2930},1200);
	return false;
});

$('#a6').click(function(){
	$('html, body').animate({scrollTop : 3670},1200);
	return false;
});

$('#a7').click(function(){
	$('html, body').animate({scrollTop : 4460},1200);
	return false;
});

// // box event
// $(".box").eq(0).addClass("ch_bg");
// $(".box").click(function() {
// 	var _ind2 = $(this).index();
// 	var top_s = an_he(_ind2);
// 	$(this).addClass("ch_bg").siblings().removeClass("ch_bg");
// 	$("html, body").animate({scrollTop:top_s},1000)	;
// });

// // scroll event
// $(window).scroll(function() {
// 	var _win_sc = $(window).scrollTop();// 找到目前卷軸位置
// 	var _ind = ch_bt(_win_sc);// 找到目前對應序號
// 	$(".box").eq(_ind).addClass("ch_bg").siblings().removeClass("ch_bg");
// 	$("aside").stop().animate({top:_win_sc},1000);
// });

// function re_win() {
// 		var imgp = $("img").eq(0);
// 		var imgwidth = imgp.width();
// 		var imgheight = imgp.height();

// 		var winwidth = $(window).width();
// 		var winheight = $(window).height();

// 		var winratio = winwidth/winheight;
// 		var imgratio = imgwidth/imgheight;

// 		$(".content").css({height: winheight});

// 		if (winratio>1 && winratio>imgratio) {
// 			$(".content").find(".fullimg").css({
// 				width:"100%",
// 				height:"auto"
// 			});
// 		}else{
// 			$(".content").find(".fullimg").css({
// 				width:"auto",
// 				height:wineight
// 			});
// 		}
// };


// function an_he(_index) {
// 	var h = $(".content").height();
// 	var top_s = h * _index;
// 	return top_s;
// };

// function ch_bt(_win){
// 	var h = $(".content").height();
// 	var _in = Math.round(_win/h);
// 	return _in;
// };

});