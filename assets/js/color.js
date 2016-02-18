//=============================================================================
// COLOR PICKER
//=============================================================================

(function() {
    var Color = {
        
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
        currentPalette: 'palette-1',
        paletteCount: 1,
        swatchesChosen: {
            'palette-1': [],
            'palette-2': [],
            'palette-3': [],
            'palette-4': [],
            'palette-5': [],
            'palette-6': []
        },
        //userColorSets: 1,
        
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
                
                //console.log('added ' + spacersNeeded + ' spacers');
                
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
        
        loadGrayscaleColors: function() {
            var grayscale = [
                '#000000',
                '#1b1b1b',
                '#363636',
                '#515151',
                '#6c6c6c',
                '#868686',
                '#a1a1a1',
                '#bcbcbc',
                '#d7d7d7',
                '#f2f2f2'
            ];
            
            // create tab pane
            $('.tab-content').append('<div class="tab-pane" id="grayscale"></div>');
            
            $.each(grayscale, function(index, value) {
                $('#grayscale').append('<div class="swatch" data-swatch-color="' + value + '" style="background-color: ' + value + '"></div>');
            });
        },
        
        clearPalette: function() {
            
            // clear array
            Color.swatchesChosen[Color.currentPalette] = [];
            
            // remove swatches
            $('.palettes .active').empty();
            
            // clear indicators
            $('.in-' + Color.currentPalette)
                .removeClass('in-' + Color.currentPalette)
                .hide()
                .show(0)
                .find('span.' + Color.currentPalette)
                .remove();
                
            Color.paletteCheck();
            
        },
        
        handlePaletteSwitch: function(e) {
            
            // get current palette based on tab clicked
            Color.currentPalette = $(e.target).attr('data-target').replace('#','');
            
            //console.log('Current palette: ' + Color.currentPalette);
            
            // run palette check
            Color.paletteCheck();
        },
        
        handleSwatchClick: function(e) {
            
            //console.log(e);
            
            var color = $(this).data('swatch-color');
            
            // if clicked swatch is in a color set (aka, adding)
            if ($(e.target).parent().hasClass('tab-pane')) {
                
                // if the color doesn't exist in the current palette
                if (!$(this).hasClass('in-' + Color.currentPalette)) {
                    
                    // copy swatch to palette
                    $(this).clone(true).empty().appendTo('.palettes .active');
                    
                    // add class noting which palette it's been added to
                    $(this).addClass('in-' + Color.currentPalette);
                    
                    // add visual indicator of what palette it's been added to
                    $(this).append('<span class="' + Color.currentPalette + '">' + Color.currentPalette.replace('palette-', '') + '</span>');
                    
                    // add to swatches array for current palette
                    Color.swatchesChosen[Color.currentPalette].push(color);
                    
                    // do CSS thing
                    var hue = $(e.target).parent().attr('id');
                    
                    $('.palettes .active textarea').append('.' + hue + ' { background-color: ' + color + '; }\n');
                    
                    // add swatches to local storage
                    // localStorage.setItem('swatches', JSON.stringify(Color.swatchesChosen));
                    
                    //console.log(Color.swatchesChosen[Color.currentPalette]);
                    //console.log(Color.swatchesChosen);
                }
            
            // if clicked swatch is in a palette (aka, removing)
            } else if ($(e.target).parents().hasClass('palettes')) {
            
                // remove from array
                var i = Color.swatchesChosen[Color.currentPalette].indexOf(color);
                if (i != -1) {
                    Color.swatchesChosen[Color.currentPalette].splice(i, 1);
                }
                
                console.log(Color.swatchesChosen);
                
                // remove swatch from palette
                $(this).remove();
                
                // remove indicator
                $('.tab-pane').children('*[data-swatch-color="' + color + '"]').removeClass('in-' + Color.currentPalette).find('span.'+ Color.currentPalette).remove();
            
            }
            
            Color.paletteCheck();
        
        },
        
        paletteCheck: function() {
            
            // palette has swatches
            if (Color.swatchesChosen[Color.currentPalette].length > 0) {
                
                $('.palette-tabs .active a[data-target="#' + Color.currentPalette + '"]').addClass('has-swatches');
                $('.palette-control button').removeClass('disabled');
                $('.palettes p').hide();
                
            // if palette is empty
            } else if (Color.swatchesChosen[Color.currentPalette].length === 0) {
            
				$('.palette-tabs .active a[data-target="#' + Color.currentPalette + '"]').removeClass('has-swatches');
				$('.palette-control button').addClass('disabled');
				$('.palettes p').show();
            
            }
            
        },
        
        clipboardNotification: function() {
            $('.clipboard-notification').fadeIn().delay(2000).fadeOut('slow');
        },
        
        initialize: function() {
            
            // safari doesnt support clipboard action, so don't show the button
            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                $('.copy-css').hide();
            }
            
            // test for touch
            if (!('ontouchstart' in document.documentElement)) {
                document.documentElement.className += 'no-touch';
            }
            
            // load preset colors
            Color.loadColors(Color.presetColors);

            // load grayscale manually
            Color.loadGrayscaleColors();
            
            /* LOCAL STORAGE
            // add stored swatches
            if (window.localStorage.getItem('swatches') === null) {
                // nuttin
            } else {
                var swatches = JSON.parse(localStorage.getItem('swatches'));
                //console.log(swatches);
                
                // for each array
                $.each(swatches, function(key, value) {
                    //console.log(key + ': ' + value);
                    
                    $.each(value, function(index, value) {
                        //console.log(value);
                        $('.palettes #' + key).append('<div class="swatch" data-swatch-color="' + value + '" style="background-color: ' + value + '"></div>');
                    });
                });
            }
            */
            
            // listen for tab switch and run spacer
            $('ul.color-sets li a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                
                // run spacer
                Color.spacer();
                
                // update URL
                //window.location.hash = e.target.hash;
                
                // scroll to top
                window.scrollTo(0, 0);
            });
            
            // activate first tab
            $('.tab-content .tab-pane:first-child').addClass('active');
            
            // listen for click events
            $('.swatch').on('click', this.handleSwatchClick);
            
            // listen for click events
            $('.clear-palette').on('click', this.clearPalette);
            
            // listen for click events
            $('.copy-css').on('click', this.clipboardNotification);
            
            // listen for click events
            $('.add-color-set').on('click', this.addColorSet);
            
            // listen for palette switching
            $('.palette-tabs').on('click', 'li a:not(.add-palette)', this.handlePaletteSwitch);
            
            // about panel
            $('h1').click(function() {
                $('.about-overlay').fadeIn();
            });
            
            $('.about-overlay').click(function(e) {
                if (e.target !== this) {
                    return;
                } else {
                    $(this).fadeOut(); 
                }
            });
            
            // space swatches
            Color.spacer();
            
            $(window).resize(function() {
                console.clear();
                Color.spacer();
            });
            
            // fast button action
            $(function() {
                FastClick.attach(document.body);
            });
            
            // initialize first palette as sortable
            $('.palettes > div').sortable({
                containment: '.palettes',
                opacity: 0.5,
                tolerance: 'pointer'
            });
            
            // instatiate clipboard action
            new Clipboard('.copy-css');
            
        }
        
    };
    
    $(document).ready(function() { Color.initialize(); });
    
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
    
    
    





