<?php
include('build/header.php');
include('build/404.php');
include('build/footer.php');

$header = buildheader($url,$type);
$fzf = buildfzf($url,$type);
$footer = buildfooter($url,$type);

echo $header;
echo $fzf;
echo $footer;
?>