<?php
error_reporting(-1);
ini_set('display_errors', 'On');

include('connect.php');

$contacts = mysqli_query($conexiune, "SELECT * FROM contact_table WHERE the_status=1");

            $line = mysqli_num_rows($contacts);
			$arr['ord'] = $line;
			
echo json_encode($arr);

?>