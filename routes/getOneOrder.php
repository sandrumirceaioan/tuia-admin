<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));

if (!$data->orderDetails) {
	http_response_code(500);
	echo json_encode('{"error": "Order details id is missing!"}');
	die();
}

$fullorder = mysqli_query($conexiune, "SELECT * FROM orders, odetails_id WHERE orders.odetail_id = ".$data->orderDetails." AND odetails_id.order_detail_id = ".$data->orderDetails."");

            $ordDet = mysqli_fetch_assoc($fullorder);

            if (!$ordDet || $ordDet == null) {
                http_response_code(500);
                echo json_encode('{"error": "Full order query failed!"}');
                die();
            }

            http_response_code(200);
    		    echo json_encode($ordDet);
?>
