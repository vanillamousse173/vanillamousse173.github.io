// JavaScript Document


$(document).ready(function() {
	
	// load
    // $("header").load("header.html");
	$("footer").load("footer.html");


	// Click event to scroll to top
	$('a[href*="#"]').on('click', function (e) {
		let target = $($(this).attr('href'));
		if (target && target.length > 0) {
			e.preventDefault();
		}
		$('html, body').animate({
				scrollTop: target.offset().top - 120
			}, 500, 'linear');
	});

	// init Swiper
	var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 設定iframe的寬度為 寬:高，16:9
    document.querySelectorAll('.swiper-slide > iframe').forEach( (iframe) => {
        if (Array.isArray(swiper)) {
            iframe.style.width = `${swiper[0].height/9*16}px`;    
        } else if (swiper) {
            iframe.style.width = `${swiper.height/9*16}px`;
        }
    });

});