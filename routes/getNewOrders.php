<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$orders = mysqli_query($conexiune, "SELECT * FROM orders WHERE osolved=0");
        $line = mysqli_num_rows($orders);
		$arr['ord'] = $line;
		
        http_response_code(200);
        echo json_encode($arr);
?>
