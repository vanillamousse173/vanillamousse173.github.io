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
		$("header").css({'top' : '-105px'});
	  }
	};

	$(".hamburger").click(function(){
		$("header").css({'top' : '0px'});
	});
	$("#a1,#a2,#a3,#a4,#a5,#a6,#a7").click(function(){
		$(".hamburger").removeClass("is-active");
	});

	// Click event to scroll to top
	$(function(){
        $('a[href*="#"]').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - 50
                }, 500, 'linear');
        });
    });


//  $('#S2').offset().top

// $('#a1').click(function(){
// 	$('html, body').animate({scrollTop : 0},1200);
// 	return false;
// });

// $('#logo').click(function(){
// 	$('html, body').animate({scrollTop : 0},1200);
// 	return false;
// });

// $('#a2').click(function(){
// 	$('html, body').animate({scrollTop : 670},1200);
// 	return false;
// });

// $('#a3').click(function(){
// 	$('html, body').animate({scrollTop : 1420},1200);
// 	return false;
// });

// $('#a4,#b4').click(function(){
// 	$('html, body').animate({scrollTop : 2110},1200);
// 	return false;
// });

// $('#a5,#b5').click(function(){
// 	$('html, body').animate({scrollTop : 2790},1200);
// 	return false;
// });

// $('#a6').click(function(){
// 	$('html, body').animate({scrollTop : 3500},1200);
// 	return false;
// });

// $('#a7').click(function(){
// 	$('html, body').animate({scrollTop : 4160},1200);
// 	return false;
// });

$('.intro').eq(49).show();

$('.tip').hover(function(){
	var _index = $(this).index();
	$('.intro').eq(_index).stop(true).slideDown(200).siblings().slideUp(200);		
	
},function(){
	$('.intro').eq(49).stop(true).slideDown(200).siblings().slideUp(200);		
	
});		


// 瀑布流圖庫
$.ajax({
	url: "https://bxf.fwt.mybluehost.me/wp-json/wp/v2/memewiki?per_page=12&_embed",
	method: "GET",
	success: function (data) {
	  let html = "";
	  data.forEach(function (post) {
		const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/300x200?text=No+Image";
		let intro = post.acf?.intro || "";
			intro = intro.length > 35 ? intro.substring(0, 35) + "…" : intro;
		const slug = post.slug;
  
		html += `
		  <div class="grid-item" onclick="window.open('https://cultivatememe.moe/meme-wiki.html?slug=${slug}', '_blank')">
			<img src="${img}" alt="${post.title.rendered}">
			<div class="grid-overlay">${intro}</div>
		  </div>
		`;
	  });
	  $("#meme-grid").html(html);
	},
	error: function (xhr, status, error) {
	  console.error("memewiki 圖庫載入失敗：", status, error);
	  $("#meme-grid").html("<p>⚠️ 無法載入圖庫</p>");
	}
  });


});