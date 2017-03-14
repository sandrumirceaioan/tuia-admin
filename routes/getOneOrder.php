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

            if (!$fullorder || $fullorder===null) {
                http_response_code(500);
                echo json_encode('{"error": "Full order query failed!"}');
                die();
            }

            $ordDet = mysqli_fetch_assoc($fullorder);
            http_response_code(200);

    		echo json_encode($ordDet);
?>
