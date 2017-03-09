<?php
error_reporting(-1);
ini_set('display_errors', 'On');

include('connect.php');

$orders = mysqli_query($conexiune, "SELECT * FROM orders ORDER BY oid DESC");

            $count = 0;

            while ($line = mysqli_fetch_assoc($orders)) {
                
                    $ord[$count] = $line;
                        
                    $count++;
            }

echo json_encode($ord)

?>