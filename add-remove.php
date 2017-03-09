<?php 
session_start();

if (isset($_GET['remove'])) {
$removeid = $_GET['remove'];
$_SESSION['cart_'.$removeid] = $_SESSION['cart_'.$removeid] - 1;
header('Location: cart');
}

if (isset($_GET['add'])) {
$addid = $_GET['add'];
$_SESSION['cart_'.$addid] = $_SESSION['cart_'.$addid] + 1;
header('Location: cart');
}

?>