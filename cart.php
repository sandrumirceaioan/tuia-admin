<?php
session_start();
include('connect.php');

if (isset($_POST['pid'])) {
    
$query = mysql_query("SELECT * FROM main_table WHERE the_id = '".$_POST['pid']."'");
$prod = mysql_fetch_assoc($query);

//START ajax add to cart form process

$errors = array();  // array to hold qty error
$data = array();    // array to pass back data

if ($_POST['qty'] > $prod['the_stock']) {
  $errors['qty'] = 'Cantitatea comandata nu este disponibila in stoc!';
}

// response if product is not in stock

if (!empty($errors)) {

  $data['success'] = false;
  $data['errors']  = $errors;
  
} else {
    
  $_SESSION['cart_'.$_POST['pid']] = $_SESSION['cart_'.$_POST['pid']] + $_POST['qty'];
  $data['success'] = true;
  $data['message'] = 'Cantitatea de <span class="omark">'.$_POST['qty'].'</span> buc. de <span class="omark">'.$prod['the_title'].'</span> a fost adaugata in cosul de cumparaturi.';
  
}

echo json_encode($data);
//END ajax add to cart form process

} else {

include('build/header.php');
include('build/cart.php');
include('build/footer.php');

$header = buildheader($url,$type);
$cart = buildcart($url,$type);
$footer = buildfooter($url,$type);

echo $header;
echo $cart;
echo $footer;

}
?>