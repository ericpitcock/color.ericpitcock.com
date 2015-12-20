<?php
    
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

// process LESS files
function printJSON() {
    // empty array for the stuff we want
    $send_array = array();
    
    // for each file
    foreach (glob('color/*.less') as $lessFile) {
        
        // get file name
        $fileName = substr(basename($lessFile), 0, -5);
        
        // make an array of colors
        $lessContents = explode(';', file_get_contents($lessFile), -1);
        
        // new empty array
        $temp_array = array();
        
        // for each color in that array, populate $temp_array with keys n values
        foreach ($lessContents as $key => $value) {
            $hexValue = readBetween($value, ': ', ';');
            $RGBValue = implode(', ', hex2rgb($hexValue));
            $colorName = str_replace('-', ' ', readBetween($value, '@', ':'));
                    
            $temp_array[$key]['name'] = $colorName;
            $temp_array[$key]['hex'] = $hexValue;
            $temp_array[$key]['rgb'] = $RGBValue;
        }
        
        $send_array[$fileName] = $temp_array;
    }
    
    $json = json_encode($send_array, JSON_PRETTY_PRINT);
    return $json;
}

?>