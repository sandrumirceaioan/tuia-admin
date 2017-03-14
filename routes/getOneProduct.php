<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));

if (!$data->productDetails) {
	http_response_code(500);
	echo json_encode('{"error": "Product details id is missing!"}');
	die();
}

$oneProduct = mysqli_query($conexiune, "SELECT * FROM main_table WHERE the_type = 2 AND the_id = ".$data->productDetails."");

        $prod = mysqli_fetch_assoc($oneProduct);

        if (!$prod || $prod == null) {
            http_response_code(500);
            echo json_encode('{"error": "One product query failed!"}');
            die();
        }

        http_response_code(200);
        echo json_encode($prod);
?>
