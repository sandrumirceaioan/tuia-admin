<?php
header('Content-Type: application/json');
error_reporting(-1);
ini_set('display_errors', 'On');
include('connect.php');

$posts = mysqli_query($conexiune, "SELECT * FROM main_table WHERE the_type = 4 ORDER BY the_id DESC");

        if (!$posts) {
            http_response_code(500);
            echo json_encode('{"error": "Posts query failed!"}');
        	die();
        }

        $pst = mysqli_fetch_all($posts, MYSQLI_ASSOC);

      	http_response_code(200);
      	echo json_encode($pst);
?>
