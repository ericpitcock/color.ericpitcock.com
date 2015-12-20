$(document).ready(function(){
    
    // iterate over the JSON
    $(colors).each(function(key, value) {
        // for each 'file'
        $.each(value, function(key, value) {
            //console.log('this is file ' + k);
            
            // create tabs
            $('.nav-tabs').prepend('<li><a href="#' + key +'" data-toggle="tab">' + key +'</a></li>');
            
            // create div to contain swatches
            $('.tab-content').prepend('<div class="tab-pane" id="' + key +'"></div>');
            
            var id = '#' + key;
            
            // for each color, append a swatch
            $.each(value, function(key, value) {
                $(id).append('<div class="swatch-container"><div class="swatch" style="background: ' + value.hex + '"></div></div>');
                //console.log('this is color ' + value.hex);
                /*
                        <h3>' + value.name + '</h3>
                        <ul class="unstyled">
                            <li><span>Hex</span><input value="' + value.hex + '" readonly></input></li>
                            <li><span>RGB</span><input value="' + value.rgb + '" readonly></input></li>
                        </ul>
                */
            });
        });
    });
    
    //activate the first tab
    $('.tab-content .tab-pane:first-child, .nav-tabs li:first-child').addClass('active');
    
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