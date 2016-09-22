//=============================================================================
// COLOR PICKER
//=============================================================================

var Color = {

    colors: {
        'red': [],
        'orange': [],
        'yellow': [],
        'green': [],
        'blue': [],
        'purple': [],
        'pink': [],
        'grayscale': [
            '#000000',
            '#303030',
        	'#616161',
        	'#919191',
        	'#C2C2C2',
        	'#F2F2F2'
        ]
    },
    currentPalette: 'palette-1',
    palettes: {
        'palette-1': [],
        'palette-2': [],
        'palette-3': [],
        'palette-4': [],
        'palette-5': [],
        'palette-6': []
    },

    generateColors: function(object) {
        // for each hue, populate its array with random values
        for (var hue in object) {
            // skip grayscale since it's already defined
            if (hue == 'grayscale') {
                return true;
            }

            // generate the random colors
            var colors = randomColor({
                hue: hue,
                luminosity: 'bright',
                count: 12
            });

            // populate the array with hex values
            Color.colors[hue] = colors;
        }
    },

    createSwatches: function(object) {
        // for every key (hue) in the object
        for (var hue in object) {
            // for every value in each hue
            for (var value in object[hue]) {
                $('#' + hue).append('<div class="swatch ' + hue + '" data-swatch-color="' + object[hue][value] + '" style="background-color: ' + object[hue][value] + '"></div>');
            }
        }
    },

    clearPalette: function() {

        var currentPalette = Color.currentPalette;

        // clear array
        Color.palettes[currentPalette] = [];

        // remove swatches
        $('.palettes .active').empty();

        // clear indicators
        $('.in-' + currentPalette)
            .removeClass('in-' + currentPalette)
            .hide()
            .show(0)
            .find('span.' + currentPalette)
            .remove();

        // check palettes
        Color.paletteCheck();
    },

    handlePaletteSwitch: function(e) {
        // get current palette based on tab clicked
        Color.currentPalette = $(e.target).attr('data-target').replace('#','');

        // run palette check
        Color.paletteCheck();
    },

    handleSwatchClick: function(e) {
        var $this = $(this),
            color = $this.data('swatch-color'),
            currentPalette = Color.currentPalette,
            palette = Color.palettes[currentPalette];

        // if clicked swatch is in a color set (aka, adding)
        if ($(e.target).parent().hasClass('tab-pane')) {

            // if the color doesn't exist in the current palette
            if (!$this.hasClass('in-' + currentPalette)) {
                // copy swatch to palette
                $this.clone(true).empty().appendTo('.palettes .active');

                // add class noting which palette it's been added to
                $this.addClass('in-' + currentPalette);

                // add visual indicator of what palette it's been added to
                $this.append('<span class="' + currentPalette + '">' + currentPalette.replace('palette-', '') + '</span>');

                // add to swatches array for current palette
                palette.push(color);
            }

        // if clicked swatch is in a palette (aka, removing)
        } else if ($(e.target).parents().hasClass('palettes')) {
            // remove from swatches array for current palette
            var i = palette.indexOf(color);
            if (i != -1) {
                palette.splice(i, 1);
            }
            // remove swatch from palette
            $this.remove();

            // remove indicator
            $('.tab-pane').children('*[data-swatch-color="' + color + '"]').removeClass('in-' + currentPalette).find('span.'+ currentPalette).remove();
        }

        // console.log(palette);

        // run palette check
        Color.paletteCheck();

    },

    paletteCheck: function() {

        var currentPalette = Color.palettes[Color.currentPalette],
            $activePaletteTab = $('.palette-tabs .active a[data-target="#' + Color.currentPalette + '"]'),
            $paletteControlsButtons = $('.palette-control button'),
            $addSwatchesNotification = $('.palettes p');

        // palette has swatches
        if (currentPalette.length > 0) {
            $activePaletteTab.addClass('has-swatches');
            $paletteControlsButtons.removeClass('disabled');
            $addSwatchesNotification.hide();

        // if palette is empty
        } else if (currentPalette.length === 0) {
			$activePaletteTab.removeClass('has-swatches');
			$paletteControlsButtons.addClass('disabled');
			$addSwatchesNotification.show();
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

        // generate colors
        this.generateColors(Color.colors);

        // create swatches
        this.createSwatches(Color.colors);

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

        // listen for tab switch
        $('ul.color-sets li a[data-toggle="tab"]').on('shown.bs.tab', function(e) {

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

        // instantiate clipboard action
        new Clipboard('.copy-css');

    }

};

$(document).ready(function() { Color.initialize(); });



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
