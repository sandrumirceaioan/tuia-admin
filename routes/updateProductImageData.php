<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));

$string = json_encode($data->images);

$upd_product_images = mysqli_query($conexiune, "UPDATE main_table SET the_image = '".$string."' WHERE the_id = ".$data->id."");

			if (mysqli_affected_rows($conexiune) > 0) {
                    http_response_code(200);
                    echo json_encode('{"success": "Images successfully saved!"}');
			} else {
				http_response_code(500);
				echo json_encode('{"error": "Could not save product images!"}');
			}
?>
