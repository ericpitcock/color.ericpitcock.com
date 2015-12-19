$(document).ready(function(){
    
    $('.tab-content .tab-pane:first-child').addClass('active');
    
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