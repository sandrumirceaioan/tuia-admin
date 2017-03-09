<?php
include('build/header.php');
include('build/page.php');
include('build/footer.php');

$header = buildheader($url,$type);
$page = buildpage($url,$type);
$footer = buildfooter($url,$type);

echo $header;
echo $page;
echo $footer;
?>