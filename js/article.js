// JavaScript Document


$(document).ready(function() {
	
// load
	$("header").load("header.html");
	$("aside").load("aside.html");

// // scroll event
// $(window).scroll(function() {
// 	var _win_sc = $(window).scrollTop();// 找到目前卷軸位置
// 	var _ind = ch_bt(_win_sc);// 找到目前對應序號
// 	$("aside").stop().animate({top:_win_sc},1000);
// });


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