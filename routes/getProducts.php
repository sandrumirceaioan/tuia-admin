<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$products = mysqli_query($conexiune, "SELECT * FROM main_table WHERE the_type = 2");

            if (!$products) {
                http_response_code(500);
                echo json_encode('{"error": "Products query failed!"}');
                die();
			      }

            $prods = mysqli_fetch_all($products, MYSQLI_ASSOC);

            http_response_code(200);
    		    echo json_encode($prods);
?>
