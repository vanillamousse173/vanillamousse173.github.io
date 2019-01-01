// JavaScript Document

$(document).ready(function() {
		$(function(){
    var $li = $('ul.tab-title li');
        $($li. eq(0) .find('a').attr('href')).siblings('.tab-inner').hide();
    
        $li.click(function(){
            $($(this).find('a'). attr ('href')).show().siblings ('.tab-inner').hide();

        });
    });
    
});