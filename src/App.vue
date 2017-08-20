<template>
  <div id="app">
    <div v-if="about" class="about-overlay">
      <div class="about">
        <h3>Color</h3>
        <p>Designed and developed by <a href="http://ericpitcock.com">Eric Pitcock.</a></p>
        <p>Special thanks to David Mer­ﬁeld’s <a href="https://randomcolor.llllll.li/">randomColor</a> and Zeno Rocha’s <a href="https://clipboardjs.com/">clipboard.js.</a></p>
      </div>
    </div>
    <div v-if="clipboard" class="clipboard-notification">CSS copied to clipboard</div>
    <header>
      <h1>Color</h1>
      <div class="palette-tabs">
        <a>Palette 1</a>
        <div class="addPalette">+</div>
      </div>
    </header>
    <div class="palettes">
      <div class="gradient-overlay"></div>
      <div class="paletteControls">
        <button type="button" class="clear-palette disabled">Clear</button>
        <button type="button" class="duplicate-palette disabled">Duplicate</button>
        <button type="button" class="copy-css disabled">Copy CSS</button>
      </div>
      <div class="palette">
        <p v-if="palettes[selectedPalette].length == 0">Add swatches to build your palette</p>
        <div v-for="swatch in palettes[selectedPalette]" class="swatch" :style="{ backgroundColor: swatch }"></div>
      </div>
    </div>
    <div class="hues">
      <div class="color-sets">
        <h2>COLOR SETS</h2>
        <button v-for="(swatch, hue) in swatches" @click="selectedHue = hue" :class="{ 'active': selectedHue == hue }">{{ hue }}</button>
      </div>
      <div class="swatches">
        <div v-for="swatch in swatches[selectedHue]" @click="palettes[selectedPalette].push(swatch)" class="swatch" :style="{ backgroundColor: swatch }"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import randomColor from 'randomColor'
  
  export default {
    name: 'app',
    data() {
      return {
        about: false,
        clipboard: false,
        currentPalette: 'palette-1',
        palettes: {
          'palette-1': [
            // 'purple',
            // 'blue'
          ]
        },
        selectedHue: 'red',
        selectedPalette: 'palette-1',
        swatches: {
          'red': [],
          'orange': [],
          'yellow': [],
          'green': [],
          'blue': [],
          'purple': [],
          'pink': [],
          'monochrome': [
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
            ]
        }
      }
    },
    methods: {
      buildSwatches: function(roygbiv) {
        for (var hue in roygbiv) {
          // skip monochrome because it's already defined
          if (roygbiv.hasOwnProperty(hue) && hue != 'monochrome') {
            var swatches = randomColor({
              hue: hue,
              luminosity: 'bright',
              count: 10
            })
            this.swatches[hue] = swatches
          }
        }
      }
    },
    created: function() {
      this.buildSwatches(this.swatches)
    }
  }
</script>

<style lang="scss">
  #app {
    
  }
  //=============================================================================
  // IMPORTS
  //=============================================================================
  @import "./assets/sass/_reset";
  
  //=============================================================================
  // VARIABLES
  //=============================================================================
  $black: black;
  $gray: #adadad;
  $light-gray: #e6e6e6;
  $lightest-gray: #f9f9f9;
  $palette-height: 210px;
  $hover: #f2f2f2;
  $button-height: 40px;
  
  //=============================================================================
  // STYLES
  //=============================================================================

  a,
  a:visited {
    text-decoration: none;
    color: $black;
  }

  body,
  html {
    height: 100%;
  }

  html {
    //overflow-y: scroll;
  }

  body,
  input,
  button {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 400; // regular
    font-size: 14px;
    color: $black;
  }
  
  #app {
    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    flex: 0 0 61px;
    align-items: center;
    background: $lightest-gray;
    border-bottom: 1px solid $light-gray;
    user-select: none;
    cursor: default;
    h1 {
      height: 20px;
      line-height: 20px;
      padding-left: 35px;
      background: url('/static/img/e.svg') left center no-repeat;
      margin: 0 60px 0 30px;
      cursor: pointer;
    }
    .palette-tabs {
      align-self: flex-end;
      display: flex;
      align-items: center;
      // height: 61px;
      overflow: hidden;
      // background: red;
      a {
        position: relative;
        display: block;
        height: $button-height;
        line-height: 38px;
        padding: 0 20px;
        border: 1px solid $light-gray;
        // margin-right: 10px;
        margin-bottom: -1px;
        cursor: pointer;
        color: #999;
        &.has-swatches:after {
          content: '';
          position: absolute;
          top: 5px;
          right: 5px;
          display: block;
          width: 5px;
          height: 5px;
          background: #a2e06e;
          border-radius: 3px;
        }
        html.no-touch &:hover {
          background: $hover;
        }
      }
      &.active {
        a {
          background: #fff;
          border-bottom-color: #fff;
          cursor: default;
          color: $black;

          html.no-touch &:hover {
            background: #fff;
          }
        }
      }
      .addPalette {
        width: 39px;
        height: 39px;
        font-size: 20px;
        text-align: center;
        line-height: 38px;
      }
    }
  }

  .palettes {
    position: relative;
    flex: 0 0 200px;
    display: flex;
    background: url('/static/img/stripe_07124988ed2a06d6779512c020f61af9.png');
    border-bottom: 1px solid $light-gray;
    .gradient-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
      background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
      background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr= '#ffffff', endColorstr='#00ffffff',GradientType=0 );
    }
    .paletteControls {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0 30px;
      z-index: 1;
      button {
        display: block;
        width: 80px;
        height: 30px;
        background: #fff;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        margin: 10px 0 0;

        &:first-child {
          margin-top: 0;
        }

        html.no-touch &:hover {
          background: $hover;
        }

        &:active {
          background: darken($hover, 10%);
        }

        &:focus {
          outline: none;
        }

        &.disabled {
          color: #ccc;
          pointer-events: none;
        }
      }

      button::-moz-focus-inner {
        border: 0;
        padding: 0;
      }
    }

    .palette {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      z-index: 1;
    }

    textarea.css {
      position: absolute;
      z-index: -1;
      border: 0;
      outline: 0;
      padding: 0;
      -webkit-appearance: none;
      resize: none;
    }
  }

  .hues {
    flex: 0 0 200px;
    display: flex;
  }
  .color-sets {
    flex: 0 0 200px;
  }
  .swatches {
    flex: 1 1 auto;
    display: flex;
    flex-wrap: wrap;
  }
  .swatch {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 30px 30px 0;

    &:after {
      content: '';
      position: absolute;
      display: inline-block;
      left: 50%;
      top: 50%;
      font-size: 40px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-left: -10px;
      margin-top: -11px;
      color: rgba(255, 255, 255, 0.5);
    }
    // hover in unselected state
    html.no-touch &:hover {
      cursor: pointer;
    }

    html.no-touch .tab-pane &:not(.added):hover:after {
      content: '+';
    }

    .palettes > div & {
      align-self: center;
      margin-bottom: 0;
    }

    html.no-touch .palettes &:hover:after {
      content: '×';
      margin-left: -10px;
      margin-top: -10px;
    }

    &.added:after {
      content: '✓';
    }

    &.add {
      border: 1px solid $light-gray;

      &:after {
        content: '+';
        color: $light-gray;
      }
    }

    &.spacer {
      cursor: default;
      pointer-events: none;
    }
    // palette indicators
    span {
      display: block;
      width: 14px;
      height: 14px;
      background: rgba(255,255,255,0.3);
      //border-radius: 7px;
      margin: 5px;
      text-align: center;
      line-height: 13px;
      font-size: 10px;
      font-weight: 600;
      color: rgba(0,0,0,0.5);
    }
  }

  h2 {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 30px;
  }

  .color-sets {
    display: flex;
    flex-direction: column;
    padding: 30px;
    button {
      height: 30px;
      margin-bottom: 10px;
      text-align: left;
      text-transform: capitalize;
    }
  }

  .colors {
    position: relative;
    // tab content
    .tab-content {
      padding-top: 40px;

      .tab-pane {
        display: none;
        flex-wrap: wrap;

        &.active {
          display: flex;
        }
      }
    }
  }

  .clipboard-notification {
    display: none;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    width: 250px;
    padding: 20px;
    background: lighten(#ffd900, 30%);
    border-radius: 5px;
    text-align: center;
  }

  .about-overlay {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: rgba(0,0,0,0.3);
    cursor: pointer;

    .about {
      position: relative;
      width: 400px;
      top: 100px;
      left: 50%;
      margin-left: -200px;
      padding: 40px 50px;
      background: #fff;
      cursor: default;

      h3 {
        font-size: 20px;
      }

      h3,
      p {
        margin-bottom: 10px;
      }

      p {
        line-height: 20px;
      }

      a {
        border-bottom: 1px solid #f5c1c1;

        &:hover {
          border-bottom-color: red;
        }
      }
    }
  }
</style>
