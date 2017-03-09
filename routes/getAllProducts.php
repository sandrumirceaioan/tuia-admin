<?php

error_reporting(-1);
ini_set('display_errors', 'On');

include('connect.php');

$products = mysqli_query($conexiune, "SELECT * FROM main_table WHERE the_type = 2");

            $count = 0;

            while ($line = mysqli_fetch_assoc($products)) {
                
                    $prod[$count] = $line;
                        
                    $count++;
            }

echo json_encode($prod);

?>