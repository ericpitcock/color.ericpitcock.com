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

            // populate the array with random colors
            Color.colors[hue] = randomColor({
                hue: hue,
                luminosity: 'bright',
                count: 12
            });
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
            //********** TO DO: CHECK AGAINST THE ARRAY INSTEAD
            if (!$this.hasClass('in-' + currentPalette)) {
                // copy swatch to palette
                $this
                    .clone(true)
                    .empty()
                    .appendTo('.palettes .active');

                // add class noting which palette it's been added to
                $this.addClass('in-' + currentPalette);

                // add to swatches array for current palette
                palette.push(color);
            } else {
                // $('#' + currentPalette + '.active')
                //     .find('.swatch:not([data-swatch-color="' + color + '"])')
                //     .css('opacity', '0.5');
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
        }

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
        $('.clipboard-notification')
            .fadeIn()
            .delay(2000)
            .fadeOut('slow');
    },

    initialize: function() {
        // safari doesnt support clipboard action, so don't show the button
        //if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        //    $('.copy-css').hide();
        //}

        // test for touch
        if (!('ontouchstart' in document.documentElement)) {
            document.documentElement.className += 'no-touch';
        }

        // generate colors
        Color.generateColors(Color.colors);

        // create swatches
        Color.createSwatches(Color.colors);

        // listen for tab switch
        $('ul.color-sets li a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            // scroll to top
            window.scrollTo(0, 0);
        });

        // listen for click events
        $('.swatch').on('click', Color.handleSwatchClick);
        $('.clear-palette').on('click', Color.clearPalette);
        $('.add-color-set').on('click', Color.addColorSet);

        // listen for palette switching
        $('.palette-tabs').on('click', 'li a:not(.add-palette)', Color.handlePaletteSwitch);

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
