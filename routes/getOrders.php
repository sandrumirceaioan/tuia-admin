<?php
error_reporting(-1);
include('connect.php');
$orders = mysqli_query($conexiune, "SELECT * FROM orders ORDER BY oid DESC");
                    $ord[$count] = $line;
            http_response_code(200);
    				echo json_encode($ord);
?>