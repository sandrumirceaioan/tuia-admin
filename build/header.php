<?php
session_start();
function buildheader($url,$type) {
        
        $layout = file_get_contents('html/header.html');
        
            
            $query = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_url = '".$url."'");
            $home_header = mysql_fetch_assoc($query);
            
            $robots = ($home_header['the_robots'] ==  0) ? 'NOINDEX, NOFOLLOW' : 'INDEX, FOLLOW';
            $layout = str_replace('{{_TITLE}}',$home_header['the_title'],$layout);
            $layout = str_replace('{{_META_DESCRIPTION}}',$home_header['the_metadescription'],$layout);
            $layout = str_replace('{{_META_KEWYWORDS}}',$home_header['the_metakeywords'],$layout);
            if ($type != 2) { //pentru produs nu afisam summary
            $layout = str_replace('{{_SUMMARY}}',$home_header['the_summary'],$layout);
            } else {$layout = str_replace('{{_SUMMARY}}','',$layout);}
            $layout = str_replace('{{_ROBOTS}}',$robots,$layout);
            
            $i = 0;
            foreach ($_SESSION as $name => $value) {
                
                if (substr(($name),0,5) == 'cart_') {
                    $i++;
                }
                
            }
            
            $plural = ($i == 1) ? 'produs' : 'produse';
            global $minicart;
            $minicart = ($i > 0) ? 'Cos de cumparaturi ('.$i.' '.$plural.')' : 'Cos de cumparaturi' ;
            $layout = str_replace('{{_SMALL_CART}}',$minicart,$layout);
                        
    return $layout;
}
?>