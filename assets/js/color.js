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
            'palette-1': [
                
            ],
            'palette-2': [
                
            ],
            'palette-3': [
                
            ],
            'palette-4': [
                
            ],
            'palette-5': [
                
            ],
            'palette-6': [
                
            ]
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
        
        loadMonochromeColors: function() {
            var monochrome = [
                '#000000',
                '#0d0d0d',
                '#191919',
                '#262626',
                '#333333',
                '#404040',
                '#4c4c4c',
                '#595959',
                '#666666',
                '#737373',
                '#7f7f7f',
                '#8c8c8c',
                '#999999',
                '#a6a6a6',
                '#b2b2b2',
                '#bfbfbf',
                '#cccccc',
                '#d9d9d9',
                '#e5e5e5',
                '#f2f2f2'
            ];
            
            // create tab pane
            $('.tab-content').append('<div class="tab-pane" id="monochrome"></div>');
            
            $.each(monochrome, function(index, value) {
                $('#monochrome').append('<div class="swatch" data-swatch-color="' + value + '" style="background-color: ' + value + '"></div>');
            });
        },
        
        addColorSet: function(e) {
            
            var count = Color.userColorSets++;
            
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
            var count = ++Color.paletteCount;
            
            // remove active tab
            $('.palette-tabs .active').removeClass('active');
            
            // remove active palette
            $('.palettes .active').removeClass('active');
            
            // clone palette 1, empty, and append
            /*jshint multistr: true */
            $('<div id="palette-' + count + '" class="active">\
                    <div class="col-sm-2">\
                        Clear<br>\
                        Delete<br>\
                        Duplicate<br>\
                        Get CSS\
                    </div>\
                    <div class="palette col-sm-10"></div>\
                </div>').appendTo('.palettes');
            
            // initialize palette as sortable
            $('#palette-' + count + ' .palette').sortable({
                containment: '#palette-' + count + ' .palette',
                tolerance: 'pointer',
                opacity: 0.5
            });
            
            // create new tab, make active
            $('<li class="active"><a data-toggle="tab" data-target="#palette-' + count + '">Palette ' + count + '</a></li>').insertBefore('.palette-tabs li:last-child');
            
            // mark as current
            Color.currentPalette = 'palette-' + count;
            console.log('Current palette: palette-' + count);
            
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
            Color.swatchesChosen = [];
            console.log(Color.swatchesChosen);
            
            // remove swatches
            $('.palette').children('.swatch').remove();
            
            // remove added class
            $('.swatch').removeClass('added');
            
            // add text back
            $('.palette p').show();
        },
        
        handlePaletteSwitch: function(e) {
            Color.currentPalette = $(e.target).attr('data-target').replace('#','');
            console.log('Current palette: ' + Color.currentPalette);
        },
        
        handleSwatchClick: function(e) {
            
            //console.log(e);
            
            var color = $(this).data('swatch-color');
            
            // if clicked swatch is in a color set (aka, adding)
            if ($(e.target).parent().hasClass('tab-pane')) {
                
                // if the color doesn't exist in the current palette
                if (!$(this).hasClass('in-' + Color.currentPalette)) {
                    
                    // copy swatch to palette
                    $(this).clone(true).empty().appendTo('.palettes .active .palette');
                    
                    // add class noting which palette it's been added to
                    $(this).addClass('in-' + Color.currentPalette);
                    
                    // add visual indicator of what palette it's been added to
                    $('<span class="' + Color.currentPalette + '">' + Color.currentPalette.replace('palette-', '') + '</span>').appendTo($('.tab-pane').children('*[data-swatch-color="' + color + '"]'));
                    
                    // add to swatches array for current palette
                    Color.swatchesChosen[Color.currentPalette].push(color);
                    
                    //console.log(Color.swatchesChosen[Color.currentPalette]);
                    console.log(Color.swatchesChosen);
                }
            
            // if clicked swatch is in a palette (aka, removing)
            } else if ($(e.target).parent().hasClass('palette')) {
            
                // remove from array
                var i = Color.swatchesChosen[Color.currentPalette].indexOf(color);
                if (i != -1) {
                    Color.swatchesChosen[Color.currentPalette].splice(i, 1);
                }
                
                console.log(Color.swatchesChosen);
                
                // remove swatch from palette
                $(this).remove();
                
                // remove added class
                $('.tab-pane').children('*[data-swatch-color="' + color + '"]').removeClass('in-' + Color.currentPalette).find('span.'+ Color.currentPalette).remove();
            
            }
            
            // palette has swatches
            if (Color.swatchesChosen[Color.currentPalette].length > 0) {
                
                console.log(Color.currentPalette + ' has swatches');
                
            // if palette is empty
            } else if (Color.swatchesChosen[Color.currentPalette].length === 0) {
            
                console.log(Color.currentPalette + ' is empty');
            
            }
            
        },
        
        initialize: function() {
            
            // test for touch
            if (!('ontouchstart' in document.documentElement)) {
                document.documentElement.className += 'no-touch';
            }
            
            // load preset colors
            Color.loadColors(Color.presetColors);

            // load monochrome manually
            Color.loadMonochromeColors();
            
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
            $('.add-color-set').on('click', this.addColorSet);
            
            // listen for click events
            $('.add-palette').on('click', this.addPalette);
            
            // listen for palette switching
            $('.palette-tabs').on('click', 'li a:not(.add-palette)', this.handlePaletteSwitch);
            
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
            $('#palette-1 .palette').sortable({
                containment: '#palette-1 .palette',
                tolerance: 'pointer',
                opacity: 0.5
            });
            
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
    
    
    





