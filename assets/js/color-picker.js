$(document).ready(function(){
    
    // tabs
    $('.nav-tabs li a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // highlight
    $('ul.unstyled li').each(function() {
        $(this).click(function() {
            $(this).children('input').select();
        });
    });

});