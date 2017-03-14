<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));

if (!$data->messageDetails) {
	http_response_code(500);
	echo json_encode('{"error": "Message details id is missing!"}');
	die();
}

$message = mysqli_query($conexiune, "SELECT * FROM contact_table WHERE the_id = ".$data->messageDetails."");

            if (!$message || $message===null) {
                http_response_code(500);
                echo json_encode('{"error": "Full order query failed!"}');
                die();
            }

            $msg = mysqli_fetch_assoc($message);
            http_response_code(200);

    		echo json_encode($msg);
?>
