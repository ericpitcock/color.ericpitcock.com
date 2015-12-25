//=============================================================================
// COLOR PICKER
//=============================================================================

(function() {
    var ColorPicker = {
        
        swatchesChosen: [],        
        presetColors: {
            'red': '#F00',
            'orange': '#FFA500',
            'yellow': '#FF0',
            'green': '#008000',
            'blue': '#00F',
            'purple': '#800080',
            'pink': '#FFC0CB'
            //'monochrome': '#000'
        },
        
        spacer: function() {
            
            var firstRow = 0,
                lastRow = 0,
                spacersNeeded = 0;
            
            // clear existing spacers
            $('.tab-pane').find('.spacer').remove();
            
            $('.tab-pane.active .swatch').each(function() {
                if ($(this).prev().length > 0) {
                    if ($(this).position().top != $(this).prev().position().top) return false;
                    firstRow++;
                }
                else {
                    firstRow++;   
                }
            });
            
            lastRow = $('.tab-pane.active .swatch').length % firstRow;
            if (lastRow === 0) { lastRow = firstRow; }
            
            //console.log('first row = ' + firstRow + ' last row = ' + lastRow);
            
            spacersNeeded = firstRow - lastRow;
            
            // if we need spacers, add them
            if (spacersNeeded > 0) {
                
                console.log('added ' + spacersNeeded + ' spacers');
                
                for (i = 0; i < spacersNeeded; i++) { 
                    $('.tab-pane.active').append('<div class="swatch spacer" style="background-color: #fff"></div>');
                }
            }
        },
        
        loadColors: function(object) {
            
            $.each(object, function(key, value) {
        
                var id = '#' + key;
                
                //console.log(value);
                
                // create tab
                $('.nav-tabs').append('<li><a href="#' + key +'" data-toggle="tab">' + key +'</a></li>');
                
                // create tab pane
                $('.tab-content').append('<div class="tab-pane" id="' + key +'"></div>');
                
                // generate colors
                var theColors = randomColor({
                    hue: key,
                    luminosity: 'bright',
                    count: 40
                });
                
                // output swatches
                $.each(theColors, function(index, value) {
                    $(id).append('<div class="swatch" data-swatch-color="' + value + '" style="background-color: ' + value + '"></div>');
                });
                
            });
            
        },
        
        clearPalette: function() {
            
            // clear array
            ColorPicker.swatchesChosen = [];
            console.log(ColorPicker.swatchesChosen);
            
            // remove swatches
            $('.palette').children('.swatch').remove();
            
            // remove added class
            $('.swatch').removeClass('added');
        },
        
        handleSwatchClick: function(e) {
            
            //console.log(e);
            
            var color = $(this).data('swatch-color');
            
            // swatch in collection 
            if ($(e.target).parent().hasClass('tab-pane')) {
                
                if (!$(this).hasClass('added')) {
                    
                    // copy swatch to palette
                    $(this).clone(true).appendTo('.palette');
                    //console.log('moved to palette');
                    
                    // add added class
                    $('.tab-pane').children('*[data-swatch-color="' + color + '"]').addClass('added');
                    
                    // add to swatches array
                    ColorPicker.swatchesChosen.push(color);
                    
                    console.log(ColorPicker.swatchesChosen);
                }
            
            // swatch in palette
            } else if ($(e.target).parent().hasClass('palette')) {
            
                // remove from array
                ColorPicker.swatchesChosen.splice($.inArray(color, ColorPicker.swatchesChosen), 1);
                
                console.log(ColorPicker.swatchesChosen);
                
                // remove swatch from palette
                $(this).remove();
                //console.log('removed');
                
                // remove added class
                $('.tab-pane').children('*[data-swatch-color="' + color + '"]').removeClass('added');
            
            }
            
            // deal with palette text
            if (ColorPicker.swatchesChosen.length > 0) {
                
                $('.palette p').hide();
                $('.clear-palette').show();
            
            } else if (ColorPicker.swatchesChosen.length === 0) {
            
                $('.palette p').show();
                $('.clear-palette').hide();
            
            }
            
        },
        
        initialize: function() {
            
            // load preset colors
            ColorPicker.loadColors(ColorPicker.presetColors);
            
            // highlight UNUSED
            $('ul.unstyled li').each(function() {
                $(this).click(function() {
                    $(this).children('input').select();
                });
            });
            
            // listen for tab switch and run spacer
            $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                
                // run spacer
                ColorPicker.spacer();
                
                // update URL
                window.location.hash = e.target.hash;
                
                // scroll to top
                window.scrollTo(0, 0);
            });
            
            // activate appropriate tab
            if (window.location.hash) {
                
                var hash = window.location.hash;
                
                // activate tab
                $('.nav-tabs a[href=' + hash + ']').parent().addClass('active');
                
                // activate tab pane
                $('.tab-content .tab-pane' + hash + '').addClass('active');
                
                // scroll to top
                window.scrollTo(0, 0);
                
            } else {
                
                $('.tab-content .tab-pane:first-child, .nav-tabs li:first-child').addClass('active');
            }
            
            // listen for click events
            $('.swatch').on('click', this.handleSwatchClick);
            
            // listen for click events
            $('.clear-palette').on('click', this.clearPalette);
            
            // space swatches
            ColorPicker.spacer();
            
            $(window).resize(function() {
                console.clear();
                ColorPicker.spacer();
            });
            
            // fast button action
            $(function() {
                FastClick.attach(document.body);
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
                $(id).append('<div class="swatch-container"><div class="swatch" style="background-color: ' + value.hex + '"></div></div>');
                //value.name
                //value.hex
                //value.rgb
            });
        });
    });
    */
    
    
    





