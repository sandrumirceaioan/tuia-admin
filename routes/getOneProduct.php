<?php
error_reporting(-1);
ini_set('display_errors', 'On');

include('connect.php');
	
$productDetail = $_GET['productDetails'];

$oneProduct = mysqli_query($conexiune, "SELECT * FROM main_table WHERE the_id = ".$productDetail."");

            $line = mysqli_fetch_assoc($oneProduct);
			
echo json_encode($line)

?>