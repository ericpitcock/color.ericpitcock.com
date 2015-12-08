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
                <p><a href="./">Brand</a> / <a href="?palette=coveragemap">CoverageMap</a> / <a href="?palette=carriers-design">Carriers</a></p>
            </div>
        </div>
        <?php output_colors(); ?>
    </div>
    
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script>
        $("ul.unstyled li").each(function() {
            $(this).click(function() {
                $(this).children("input").select();
            })
        });
    </script>
</body>
</html>
