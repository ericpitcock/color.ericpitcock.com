$(document).ready(function(){
    
    // iterate over the JSON
    $(colors).each(function(key, value) {
        // for each 'file'
        $.each(value, function(key, value) {
            //console.log('this is file ' + k);
            
            // create tabs
            $('.nav-tabs').prepend('<li><a href="#' + key +'" data-toggle="tab">' + key +'</a></li>');
            
            // create tab pane
            $('.tab-content').prepend('<div class="tab-pane" id="' + key +'"></div>');
            
            var id = '#' + key;
            
            // for each color, append a swatch
            $.each(value, function(key, value) {
                $(id).append('<div class="swatch-container"><div class="swatch" style="background: ' + value.hex + '"></div></div>');
                //value.name
                //value.hex
                //value.rgb
            });
        });
    });
    
    //activate the first tab
    $('.tab-content .tab-pane:first-child, .nav-tabs li:first-child').addClass('active');
    
    // tabs
    $('.nav-tabs li a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    
    // fill the empty space
    function spacer() {
        var firstRow = 0;
        var lastRow = 0;
        var spacersNeeded = 0;
        
        $('.tab-pane').find('.spacer').remove();
        
        $('.tab-pane.active .swatch-container').each(function() {
            if ($(this).prev().length > 0) {
                if ($(this).position().top != $(this).prev().position().top) return false;
                firstRow++;
            }
            else {
                firstRow++;   
            }
        });
        
        lastRow = $('.tab-pane.active .swatch-container').length % firstRow;
        if (lastRow === 0) { lastRow = firstRow; }
        
        //console.log('first row = ' + firstRow + ' last row = ' + lastRow);
        
        spacersNeeded = firstRow - lastRow;
        
        // if we need spacers, add them
        if (spacersNeeded > 0) {
            
            console.log('added ' + spacersNeeded + ' spacers');
            
            for (i = 0; i < spacersNeeded; i++) { 
                $('.tab-pane.active').append('<div class="swatch-container spacer"><div class="swatch" style="background: #fff"></div></div>');
            }
        
        // otherwise, remove any old spacers
        } else {
            $('.tab-pane').find('.spacer').remove();
        }
        
    }
    
    spacer();
    
    $(window).resize(function() {
        console.clear();
        spacer();
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function() {
        spacer();
    });

    // highlight
    $('ul.unstyled li').each(function() {
        $(this).click(function() {
            $(this).children('input').select();
        });
    });
    
    // random colors
    
    var presets = ['red', 'orange', 'yellow'/*, 'green', 'blue', 'indigo', 'violet' */];
    
    $(presets).each(function(index, value) {
        
        // generate colors
        var theColors = randomColor({
            hue: value,
            count: 18
        });
        
        // create tab
        $('.nav-tabs').prepend('<li><a href="#' + value +'" data-toggle="tab">' + value +'</a></li>');
        
        // create tab pane
        $('.tab-content').prepend('<div class="tab-pane" id="' + value +'"></div>');
        
        var id = '#' + value;
        
        // output swatches
        $(theColors).each(function(index, value) {
            $(id).append('<div class="swatch-container"><div class="swatch" style="background: ' + value + '"></div></div>');
        });
        
    });
});




