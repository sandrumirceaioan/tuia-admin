<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$contacts = mysqli_query($conexiune, "SELECT * FROM contact_table ORDER BY the_status DESC");
if (!$contacts) {
    http_response_code(500);
    echo json_encode('{"error": "Messages query failed!"}');    
	die();
}
	$count = 0;
	while ($line = mysqli_fetch_assoc($contacts)) { 
		$msg[$count] = $line; 
		$count++;
	}
	http_response_code(200);
	echo json_encode($msg);
?>