<?php require_once('functions.php'); ?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>Color Picker</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--<link rel="shortcut icon" href="favicon.ico" />-->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600">
    <link rel="stylesheet" href="assets/css/color-picker.css">
</head>
<body>
    <div class="container colors">
        <div class="row">
            <div class="col-sm-12">
                <h1>Color Picker</h1>
            </div>
        </div>
        <div class="row">
            <!-- Nav tabs -->
            <div class="col-sm-12">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="active"><a href="#color-root" data-toggle="tab">Root</a></li>
                    <li><a href="#color-carriers" data-toggle="tab">Carriers</a></li>
                    <li><a href="#color-carriers-design" data-toggle="tab">Carriers Design</a></li>
                    <li><a href="#color-root-coveragemap" data-toggle="tab">WCM</a></li>
                </ul>
            </div>
        </div>
        <div class="row">
            <!-- Tab panes -->
            <div class="tab-content col-sm-12">
                <?php output_colors(); ?>
            </div>
        </div>
    </div>
    <script>
        // print json here
    </script>
    <script src="assets/js/color-picker.min.js"></script>
</body>
</html>
