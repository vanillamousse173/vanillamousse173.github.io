// JavaScript Document

$(document).ready(function() {
		$(function(){
            var $li = $('#c1,#c2,#c3,#c4');
            $($li. eq(0) .find('a').attr('href')).siblings('.tab-inner').hide();
       
            $li.click(function(){

            $($(this).find('a'). attr ('href')).show().siblings ('.tab-inner').hide();
                        // $(this).addClass("ch_bg").siblings().removeClass("ch_bg");
        });
    });
    
});