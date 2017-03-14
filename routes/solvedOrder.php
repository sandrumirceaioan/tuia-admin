<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->order)) {
	http_response_code(500);
	echo json_encode('{"error": "Order id is missing!"}');
	die();
}
$upd_status = mysqli_query($conexiune, "UPDATE orders SET osolved=1 WHERE odetail_id=".$data->order."");
			if (mysqli_affected_rows($conexiune) > 0) {
				http_response_code(200);				
				echo json_encode('{"success": "Order marked as solved!"}');
			} else {
				http_response_code(500);  
				echo json_encode('{"error": "Order status update failed!"}');
			}
?>
