<?php

error_reporting(-1);
ini_set('display_errors', 'On');

include('connect.php');

$contacts = mysqli_query($conexiune, "SELECT * FROM contact_table ORDER BY the_status DESC");

            $count = 0;

            while ($line = mysqli_fetch_assoc($contacts)) {
                
                    $cont[$count] = $line;
                        
                    $count++;
            }

echo json_encode($cont);

?>