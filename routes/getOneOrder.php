<?php
error_reporting(-1);
ini_set('display_errors', 'On');

include('connect.php');

$orderDetail = $_GET['orderDetails'];

$complete_order = mysqli_query($conexiune, "SELECT * FROM orders, odetails_id WHERE orders.odetail_id = ".$orderDetail." AND  odetails_id.order_detail_id = ".$orderDetail."");

            $ordDet = mysqli_fetch_assoc($complete_order);

echo json_encode($ordDet)

?>