<?php
include('build/header.php');
include('build/gallery.php');
include('build/footer.php');

$header = buildheader($url,$type);
$gallery = buildgallery($url,$type);
$footer = buildfooter($url,$type);

echo $header;
echo $gallery;
echo $footer;
?>