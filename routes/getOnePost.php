<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));

if (!$data->postDetails) {
	http_response_code(500);
	echo json_encode('{"error": "Post details id is missing!"}');
	die();
}

$post = mysqli_query($conexiune, "SELECT * FROM main_table WHERE the_id = ".$data->postDetails." AND the_type=4");

            $pst = mysqli_fetch_assoc($post);

            if (!$pst || $pst == null) {
                http_response_code(500);
                echo json_encode('{"error": "One post query failed!"}');
                die();
            }

            http_response_code(200);
    		    echo json_encode($pst);
?>
