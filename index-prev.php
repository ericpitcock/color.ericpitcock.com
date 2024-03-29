<?php //require_once('functions.php'); ?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>Color</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--<link rel="shortcut icon" href="favicon.ico" />-->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600">
    <link rel="stylesheet" href="assets/css/color-picker.css">
</head>
<body>
    <div class="controls">
        <h1><a href="/">Color</a></h1>
        <h2>COLOR SETS</h2>
<!--
        <ul class="color-sets">
            <li><a class="add-color-set" href="">+ Add color set</a></li>
        </ul>
-->
        <ul class="color-sets">
            <li class="active"><a href="#red" data-toggle="tab">red</a></li>
            <li><a href="#orange" data-toggle="tab">orange</a></li>
            <li><a href="#yellow" data-toggle="tab">yellow</a></li>
            <li><a href="#green" data-toggle="tab">green</a></li>
            <li><a href="#blue" data-toggle="tab">blue</a></li>
            <li><a href="#purple" data-toggle="tab">purple</a></li>
            <li><a href="#pink" data-toggle="tab">pink</a></li>
            <li><a href="#monochrome" data-toggle="tab">monochrome</a></li>
            <li><a href="" class="add-color-set">+ Add color set</a></li>
        </ul>
    </div>
    <div class="colors">
        <ul class="palette-tabs">
            <li class="active"><a href="#settings" data-target=".settings-tab">Palette 1</a></li>
            <li><a href="#settings" class="add-palette" data-target="">+ Add palette</a></li>
        </ul>
        <div class="palette">
            <div class="clear-palette">Clear</div>
            <p>Select colors to build your palette</p>
        </div>
        <div class="tab-content"></div>
    </div>
    <!--<script>
        var colors = <?php //echo printJSON(); ?>;
    </script>-->
    <script src="assets/js/color-picker.min.js"></script>
</body>
</html>
