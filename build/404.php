<?php
function buildfzf($url,$type) {
        
        $layout = file_get_contents('html/404.html');
        
            $query = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_url = '".$url."'");
            $fourzerofour = mysql_fetch_assoc($query);
            
            $robots = ($fourzerofour['the_robots'] ==  0) ? 'NOINDEX, NOFOLLOW' : 'INDEX, FOLLOW';
            
            $layout = str_replace('{{_404_SUMARY}}',$fourzerofour['the_summary'],$layout);
            $layout = str_replace('{{_404_IMAGE}}',$fourzerofour['the_image'],$layout);
            $layout = str_replace('{{_404_DESCRIPTION}}',$fourzerofour['the_description'],$layout);
            $layout = str_replace('{{_ROBOTS}}',$robots,$layout);
            
             
    return $layout;
}
?>