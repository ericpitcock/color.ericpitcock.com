//=============================================================================
// COLOR PICKER
//=============================================================================

(function() {
    var ColorPicker = {
        
        presetColors: {
            'red': '#F00',
            'orange': '#FFA500',
            'yellow': '#FF0',
            'green': '#008000',
            'blue': '#00F',
            'purple': '#800080',
            'pink': '#FFC0CB',
            'monochrome': '#000'
        },
        swatchesChosen: [],
        userColorSets: 1,
        paletteCount: 1,
        
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
                //$('.color-sets').append('<li><a href="#' + key +'" data-toggle="tab">' + key +'</a></li>');
                
                // create tab pane
                $('.tab-content').append('<div class="tab-pane" id="' + key +'"></div>');
                
                // generate colors
                var theColors = randomColor({
                    hue: key,
                    luminosity: 'bright',
                    count: 20
                });
                
                // output swatches
                $.each(theColors, function(index, value) {
                    $(id).append('<div class="swatch" data-swatch-color="' + value + '" style="background-color: ' + value + '"></div>');
                });
                
            });
            
        },
        
        addColorSet: function(e) {
            
            var count = ColorPicker.userColorSets++;
            
            // remove current active
            $('.active').removeClass('active');
            
            // create tab
            //$('.color-sets').append('<li class="active"><a href="#user-' + count + '" data-toggle="tab">User Color ' + count + '</a></li>');
            $('<li class="active"><a href="#user-' + count + '" data-toggle="tab">User Color ' + count + '</a></li>').insertBefore('.color-sets li:last-child');
            
            
            // create tab pane
            $('.tab-content').append('<div class="tab-pane active" id="user-' + count + '"><div class="swatch add"></div></div>');
            
            e.preventDefault();
        },
        
        addPalette: function(e) {
            
            // increment palette count
            var count = ++ColorPicker.paletteCount;
            
            // remove active tab
            $('.palette-tabs .active').removeClass('active');
            
            // remove active palette
            $('.palettes .active').removeClass('active');
            
            // make new palette active
            $('#palette-' + count + '').addClass('active');
            
            // initialize palette as sortable
            $('#palette-' + count + '').sortable({
                containment: '#palette-' + count + '',
                tolerance: 'pointer',
                opacity: 0.5
            });
            
            // create new tab, make active
            $('<li class="active"><a data-toggle="tab" data-target="#palette-' + count + '">Palette ' + count + '</a></li>').insertBefore('.palette-tabs li:last-child');
            
            if (count >= 6) {
                $('.add-palette').addClass('disabled');
            } else {
                $('.add-palette').removeClass('disabled');
            }
            
            e.preventDefault();
        },
        
        clearPalette: function() {
            
            // hide button
            $('.clear-palette').hide();
            
            // clear array
            ColorPicker.swatchesChosen = [];
            console.log(ColorPicker.swatchesChosen);
            
            // remove swatches
            $('.palette').children('.swatch').remove();
            
            // remove added class
            $('.swatch').removeClass('added');
            
            // add text back
            $('.palette p').show();
        },
        
        handleSwatchClick: function(e) {
            
            //console.log(e);
            
            var color = $(this).data('swatch-color');
            
            // swatch in color set 
            if ($(e.target).parent().hasClass('tab-pane')) {
                
                if (!$(this).hasClass('added')) {
                    
                    // copy swatch to palette
                    $(this).clone(true).appendTo('.palette.active');
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
            
            // test for touch
            if (!('ontouchstart' in document.documentElement)) {
                document.documentElement.className += 'no-touch';
            }
            
            // load preset colors
            ColorPicker.loadColors(ColorPicker.presetColors);
            
            // listen for tab switch and run spacer
            $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                
                // run spacer
                ColorPicker.spacer();
                
                // update URL
                //window.location.hash = e.target.hash;
                
                // scroll to top
                window.scrollTo(0, 0);
            });
            
            // activate first tab
            $('.tab-content .tab-pane:first-child, .color-sets li:first-child').addClass('active');
            
            // listen for click events
            $('.swatch').on('click', this.handleSwatchClick);
            
            // listen for click events
            $('.clear-palette').on('click', this.clearPalette);
            
            // listen for click events
            $('.add-color-set').on('click', this.addColorSet);
            
            // listen for click events
            $('.add-palette').on('click', this.addPalette);
            
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
            
            // initialize palette as sortable
            $('#palette-1').sortable({
                containment: '#palette-1',
                tolerance: 'pointer',
                opacity: 0.5
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
    
    
    





