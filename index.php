<?php require_once('functions.php'); ?>

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
        <ul class="presets nav nav-tabs"></ul>
        <a class="add-color-set" href="">+ Add color set</a>
    </div>
    <div class="colors">
        <div class="palette">
            <div class="clear-palette">Clear</div>
            <p>Select colors to build your palette</p>
        </div>
        <div class="tab-content"></div>
    </div>
    <script>
        var colors = <?php echo printJSON(); ?>;
    </script>
    <script src="assets/js/color-picker.min.js"></script>
</body>
</html>
