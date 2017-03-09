<?php
include('build/header.php');
include('build/category.php');
include('build/footer.php');

$header = buildheader($url,$type);
$category = buildcategory($url,$type);
$footer = buildfooter($url,$type);

echo $header;
echo $category;
echo $footer;
?>
