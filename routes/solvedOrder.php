<?php
error_reporting(-1);
ini_set('display_errors', 'On');

include('connect.php');

$orderDetail = $_GET['orderDetails'];

$upd_status = mysqli_query($conexiune, "UPDATE orders SET osolved=1 WHERE odetail_id=".$orderDetail."");

			if (!$upd_status) {
				$err = ["success" => false];
				echo json_encode($err);
			} else {
				$scc = ["success" => true];
				echo json_encode($scc);
			}

?>