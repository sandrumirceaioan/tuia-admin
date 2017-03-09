<?php
    include('connect.php');
    //Get last part of page url
    $fullurl = $_SERVER["REQUEST_URI"];
    $split = explode('/',$fullurl);
    $url = end($split);
    
    
    //Determine page type: homepage, page, product, category, blog
    $query = mysql_query("SELECT * FROM main_table WHERE the_url = '".$url."'");
    if (mysql_num_rows($query) != 0) {
        
        $row = mysql_fetch_assoc($query);
        $type = $row['the_type'];
        
    } else {
        
        header('Location: /404');
        
    }  
?>