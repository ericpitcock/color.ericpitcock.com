<?php

function output_colors() {
    
    // get the value between all the mess
    function readBetween($content, $start, $end) {
        $r = explode($start, $content);
        if (isset($r[1])){
            $r = explode($end, $r[1]);
            return $r[0];
        }
        return '';
    }
    
    // hex to rgb
    function hex2rgb($hexValue) {
        if ($hexValue[0] == '#') {
            $hexValue = substr($hexValue, 1);
        }
        if (strlen($hexValue) == 6) {
            list($r,$g,$b) = array($hexValue[0] . $hexValue[1], $hexValue[2] . $hexValue[3], $hexValue[4] . $hexValue[5]);
        } elseif (strlen($hexValue) == 3) {
            list($r,$g,$b) = array($hexValue[0] . $hexValue[0], $hexValue[1] . $hexValue[1], $hexValue[2] . $hexValue[2]);
        } else {
            return false;
        }
        $r = hexdec($r);
        $g = hexdec($g);
        $b = hexdec($b);
        return array('red' => $r, 'green' => $g, 'blue' => $b);
    }
    
    // NEW AUTO LESS FILE GRABBER SYSTEM
    
    // for each less file
    foreach (glob('color/*.less') as $lessFile) {
        
        // split string into an array, divded by //
        $lessContents = explode('//', file_get_contents($lessFile));

        // for each //, make a row
        foreach ($lessContents as $section) {
            
            //print_r($section);
            
            //echo "sections" . $section. "<br>";
            echo '<div class="row">';
            
            // split section array into swatches by ";"
            $swatches = explode(";", $section, -1);
            
            // output each swatch
            foreach ($swatches as $swatch) { ?>
                <?php
                    $hexValue = readBetween($swatch, ": ", ";");
                    $RGBValue = implode(', ', hex2rgb($hexValue));
                    $colorName = str_replace('-', ' ', readBetween($swatch, '@', ':'));
                ?>
                
                <div class="col-sm-2">
                <div class="color-chip" style="background: <?php echo $hexValue; ?>;"></div>
                <h3><?php echo $colorName; ?></h3>
                <ul class="unstyled">
                    <li><span>Hex</span><input value="<?php echo $hexValue; ?>" readonly></input></li>
                    <li><span>RGB</span><input value="<?php echo $RGBValue; ?>" readonly></input></li>
                </ul>
                </div>
            <? }
                
            echo '</div>';
        }
    }
}

?>