<?php
include('build/header.php');
include('build/blog.php');
include('build/footer.php');

$header = buildheader($url,$type);
$blog = buildblog($url,$type);
$footer = buildfooter($url,$type);

echo $header;
echo $blog;
echo $footer;
?>