<?php
include('build/header.php');
include('build/homepage.php');
include('build/footer.php');

$header = buildheader($url,$type);
$homepage = buildhomepage($url,$type);
$footer = buildfooter($url,$type);

echo $header;
echo $homepage;
echo $footer;
?>