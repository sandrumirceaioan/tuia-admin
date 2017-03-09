<?php 
session_start();

if (isset($_GET['delete'])) {
$deleteid = $_GET['delete'];
unset($_SESSION['cart_'.$deleteid.'']);
header('Location: cart');
}

?>