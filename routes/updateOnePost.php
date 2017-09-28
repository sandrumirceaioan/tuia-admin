<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));
$keywords = json_encode($data->the_metakeywords);

$upd_post_info = mysqli_query($conexiune, "UPDATE main_table SET the_title = '".$data->the_title."', the_url = '".$data->the_url."', the_order = '".$data->the_order."', the_shortdescription = '".$data->the_shortdescription."', the_metadescription = '".$data->the_metadescription."', the_metakeywords = '".$keywords."', the_active = ".$data->the_active.", the_robots = ".$data->the_robots.", the_date = ".$data->the_date.", the_description = '".$data->the_description."' WHERE the_id = ".$data->id."");

			if ($upd_post_info) {
                    http_response_code(200);
                    echo json_encode('{"success": "Post info successfully saved!"}');
			} else {
				http_response_code(500);
				echo json_encode('{"error": "Could not save post info!"}');
			}
?>
