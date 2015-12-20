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
                $(id).append('
                    <div class="col-sm-2">
                        <div class="color-chip" style="background: ' + value.hex + '"></div>
                        <h3>' + value.name + '</h3>
                        <ul class="unstyled">
                            <li><span>Hex</span><input value="' + value.hex + '" readonly></input></li>
                            <li><span>RGB</span><input value="' + value.rgb + '" readonly></input></li>
                        </ul>
                    </div>
                ');
                //console.log('this is color ' + value.hex);
                /*
                <div class="col-sm-2">
                <div class="color-chip" style="background: <?php echo $hexValue; ?>;"></div>
                <h3><?php echo $colorName; ?></h3>
                <ul class="unstyled">
                    <li><span>Hex</span><input value="<?php echo $hexValue; ?>" readonly></input></li>
                    <li><span>RGB</span><input value="<?php echo $RGBValue; ?>" readonly></input></li>
                </ul>
                </div>
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