<?php
include('type.php');

if ($type == 0) {
include('homepage.php');

} else if ($type == 1 and $url != '404' ) {
include('page.php');

} else if ($type == 1 and $url == '404' ) {	
include('404.php');

} else if ($type == 6) {	
include('gallery.php');

} else if ($type == 2) {		
include('product.php');

} else if ($type == 3) {		
include('category.php');

} else if ($type == 4) {		
include('blog.php');

} else if ($type == 5) {		
include('cart.php');

} else if ($type == 7) {		
include('order.php');
}
?>