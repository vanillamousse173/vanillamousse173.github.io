// JavaScript Document

$(document).ready(function() {
    var $li = $('#c1,#c2,#c3,#c4');
    $($li. eq(0) .find('a').attr('href')).siblings('.tab-inner').hide();

    $li.click(function(){
        $($(this).find('a'). attr ('href')).show().siblings ('.tab-inner').hide();
    });

    
    // click li -> remove all .c_selected and add .c_selected on target li
    document.querySelectorAll('.tab-title li').forEach(item => {
        item.addEventListener('click', ()=> {
            // clear all li .c_selected
            document.querySelectorAll('.tab-title li').forEach(li => {
                li.classList.remove('c_selected');
            });
            // add class on target li
            item.classList.add('c_selected');
        });
    });

});