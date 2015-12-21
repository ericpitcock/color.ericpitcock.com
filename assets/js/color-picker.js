//=============================================================================
// COLOR PICKER
//=============================================================================

(function() {
    var ColorPicker = {
        
        //defaults:,
        
        presets: {
            'red': '#F00',
            'orange': '#FFA500',
            'yellow': '#FF0',
            'green': '#008000',
            'blue': '#00F',
            'purple': '#800080',
            'pink': '#FFC0CB',
            'monochrome': '#000'
        },
        
        spacer: function() {
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
        },
        
        loadColors: function(object) {
            
            $.each(object, function(key, value) {
        
                var id = '#' + key;
                
                console.log(value);
                
                // create tab
                $('.nav-tabs').prepend('<li><a href="#' + key +'" data-toggle="tab">' + key +'</a></li>');
                
                // create tab pane
                $('.tab-content').prepend('<div class="tab-pane" id="' + key +'"></div>');
                
                // generate colors
                var theColors = randomColor({
                    hue: key,
                    count: 40
                });
                
                // output swatches
                $(theColors).each(function(index, value) {
                    $(id).append('<div class="swatch-container"><div class="swatch" style="background: ' + value + '"></div></div>');
                });
                
            });
            
        },
        
        initialize: function() {
            ColorPicker.loadColors(ColorPicker.presets);
            
            // highlight UNUSED
            $('ul.unstyled li').each(function() {
                $(this).click(function() {
                    $(this).children('input').select();
                });
            });
            
            // listen for tab switch and run spacer
            $('a[data-toggle="tab"]').on('shown.bs.tab', function() {
                ColorPicker.spacer();
            });
            
            //activate the first tab
            $('.tab-content .tab-pane:first-child, .nav-tabs li:first-child').addClass('active');
            
            ColorPicker.spacer();
            
            $(window).resize(function() {
                console.clear();
                ColorPicker.spacer();
            });
            
        }
        
    };
    
    $(document).ready(function() { ColorPicker.initialize(); });
    
})();


    
    /* iterate over the LESS GENERATED JSON
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
    */
    
    
    





