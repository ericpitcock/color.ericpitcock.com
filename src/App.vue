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
      </div>
      <div class="addPalette">+</div>
    </header>
    <div class="palette-container">
      <div class="gradient-overlay"></div>
      <div class="container">
        <div class="row">
          <div class="palette-control col-sm-2">
            <button type="button" class="clear-palette disabled">Clear</button>
            <!--<button type="button" class="duplicate-palette disabled">Duplicate</button>-->
            <button type="button" class="copy-css disabled" data-clipboard-target=".active textarea">Copy CSS</button>
          </div>
          <div class="palettes col-sm-10">
            <p>Add swatches to build your palette</p>
            <div id="palette-1" class="active"><textarea class="css"></textarea></div>
            <div id="palette-2"><textarea class="css"></textarea></div>
            <div id="palette-3"><textarea class="css"></textarea></div>
            <div id="palette-4"><textarea class="css"></textarea></div>
            <div id="palette-5"><textarea class="css"></textarea></div>
            <div id="palette-6"><textarea class="css"></textarea></div>
          </div>
        </div>
      </div>
    </div>
    <div class="color-sets-container">
      <div class="container">
        <div class="row">
          <div class="col-sm-2">
            <h2>COLOR SETS</h2>
            <ul class="color-sets">
              <li v-for="(hue, name) in roygbiv">{{ name }}</li>
            </ul>
          </div>
          <div class="colors col-sm-10 col-sm-offset-2">
            <div class="tab-content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        roygbiv: {
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
        palettes: {},
        selectedHue: ''
      }
    },
    methods: {
      loadDefaultColors: function(object) {
        for (var hue in roygbiv) {
          if (roygbiv.hasOwnProperty(hue)) {
            // roygbiv[hue] <-- name
          }
        }
      }
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

  body {
    display: flex;
    flex-direction: column;
  }

  body,
  input {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 400; // regular
    font-size: 14px;
    color: $black;
  }

  header {
    height: 61px;
    background: $lightest-gray;
    border-bottom: 1px solid $light-gray;
    user-select: none;
    cursor: default;

    h1 {
      height: 20px;
      line-height: 20px;
      padding-left: 35px;
      background: url("/static/img/e.svg") left center no-repeat;
      margin-top: 20px;
      cursor: pointer;
    }

    .palette-tabs {
      display: flex;
      align-items: flex-end;
      height: 61px;
      overflow: hidden;
      //background: #f9f9f9;
      li {
        // styles everything
        a {
          position: relative;
          display: block;
          height: $button-height;
          line-height: 38px;
          padding: 0 20px;
          border: 1px solid $light-gray;
          margin-right: 10px;
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
      }
    }
  }

  .palette-container {
    position: relative;
    background: url("/static/img/stripe_07124988ed2a06d6779512c020f61af9.png");
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

    .palette-control {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 200px;

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

    .palettes {
      & > div {
        display: none;
        align-content: flex-start;
        height: 200px;

        &.active {
          display: flex;
        }
      }

      p {
        display: block;
        position: absolute;
        width: 300px;
        height: 40px;
        background: #fff;
        border: 1px solid #e6e6e6;
        top: 80px;
        left: 15px;
        text-align: center;
        line-height: 37px;
      }
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

  .color-sets-container {
    flex: 1;
    position: relative;

    .container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        width: 0 !important;
      }

      .col-sm-2 {
        position: fixed;
        padding-top: 40px;
      }
    }

    h2 {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 30px;
    }

    ul.color-sets {
      li {
        text-transform: capitalize;

        &.active {
          font-weight: 600;

          a {
            color: $black;
            cursor: default;
          }
        }

        a {
          display: block;
          height: $button-height;
          color: $gray;
          cursor: pointer;

          html.no-touch &:hover {
            color: $black;
          }
        }
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
