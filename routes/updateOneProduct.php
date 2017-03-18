<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));

$upd_product_info = mysqli_query($conexiune, "UPDATE main_table SET the_title = '".$data->the_title."', the_url = '".$data->the_url."', the_shortdescription = '".$data->the_shortdescription."', the_description = '".$data->the_description."', the_active = ".$data->the_active.", the_robots = ".$data->the_robots.", the_oldprice = ".$data->the_oldprice.", the_newprice = ".$data->the_newprice."  WHERE the_id = ".$data->id."");

			if ($upd_product_info) {
                    http_response_code(200);
                    echo json_encode('{"success": "Product info successfully saved!"}');
			} else {
				http_response_code(500);
				echo json_encode('{"error": "Could not save product info!"}');
			}
?>
