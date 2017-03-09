<?php
function buildpage($url,$type) {
        
        $layout = file_get_contents('html/page.html');
        
                $query = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_url = '".$url."'");
                $page = mysql_fetch_assoc($query);
                
                $layout = str_replace('{{_PAGE_CONTENT}}',$page['the_description'],$layout);

     
    return $layout;
}
?>