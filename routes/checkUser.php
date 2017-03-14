<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$data = json_decode(file_get_contents("php://input"));
if (!$data->pass) {	
	http_response_code(401);	
	echo json_encode('{"error": "Token not found or empty!"}');	
	die();
}
$pass = $data->pass;
$users = mysqli_query($conexiune, "SELECT * FROM admin WHERE password='".$pass."'");
            $usr = mysqli_fetch_assoc($users);			
			if (!$usr) {				
				http_response_code(401);				
				echo json_encode('{"error": "User not logged in!"}');				
				die();			
			}				
			http_response_code(200);				
			echo json_encode($usr);
?>