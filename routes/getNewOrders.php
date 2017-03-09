<?php
error_reporting(-1);
ini_set('display_errors', 'On');

include('connect.php');

$orders = mysqli_query($conexiune, "SELECT * FROM orders WHERE osolved=0");

            $line = mysqli_num_rows($orders);
			$arr['ord'] = $line;
			
echo json_encode($arr);

?>