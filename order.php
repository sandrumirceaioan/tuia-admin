<?php
include('build/header.php');
include('build/order.php');
include('build/footer.php');

$header = buildheader($url,$type);
$order = buildorder($url,$type);
$footer = buildfooter($url,$type);

echo $header;
echo $order;
echo $footer;
?>