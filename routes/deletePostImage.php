<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));
$string = json_encode($data->arr);

$small_img = '../images/blog/small/';
$large_img = '../images/blog/';

$upd_post_image = mysqli_query($conexiune, "UPDATE main_table SET the_image = '".$string."' WHERE the_id = ".$data->id."");

			if (mysqli_affected_rows($conexiune) > 0) {

                if(unlink($small_img.$data->file) && unlink($large_img.$data->file)) {
                    http_response_code(200);
                    echo json_encode('{"success": "Image successfully deleted!"}');
                } else {
                    http_response_code(500);
                    echo json_encode('{"error": "Database updated but image not deleted!"}');
                }

			} else {
				http_response_code(500);
				echo json_encode('{"error": "Could not delete product image!"}');
			}
?>
