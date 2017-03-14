<?php
function buildblog($url,$type) {
        
        $layout = file_get_contents('html/blog.html');
        $layout_list_fresh = file_get_contents('html/blog-list.html');
        $layout_single = file_get_contents('html/blog-single.html');
            
            //if is main blog page
            if($url == 'blog') {
                
                $query = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_parent = 16 ORDER BY the_id DESC");
                
                $blog_product_list = "<ul class=\"blog-list medium-img\">";
                $recent_posts = "";
                
                while ($blog = mysql_fetch_assoc($query)) {
                    
                    $layout_list = $layout_list_fresh;
                    $layout_list = str_replace('{{_POST_IMAGE}}',$blog['the_image'],$layout_list);
                    $layout_list = str_replace('{{_POST_URL}}',$blog['the_url'],$layout_list);
                    $layout_list = str_replace('{{_POST_TITLE}}',$blog['the_title'],$layout_list);                   
                    $layout_list = str_replace('{{_POST_DATE}}',date('F j, Y', strtotime($blog['the_date'])),$layout_list);
                    $layout_list = str_replace('{{_POST_SHORT}}',$blog['the_shortdescription'],$layout_list);
                 
                    $blog_product_list .= $layout_list;
                    
                    $recent_posts .= '<li><a href="/blob/'.$blog['the_url'].'">'.$blog['the_title'].'</a></li>';
                    
                }
                
                $blog_product_list .= "</ul>";
                
                $layout = str_replace('{{_BLOG_CONTENT}}',$blog_product_list,$layout);
                $layout = str_replace('{{_RECENT_POSTS}}',$recent_posts,$layout);
                
            //if is single post page
            } else {
                
                $query = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_url = '".$url."'");
                $query2 = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_parent = 16 ORDER BY the_id DESC");
                $blog = mysql_fetch_assoc($query);
                                
                $layout_single = str_replace('{{_POST_IMAGE}}',$blog['the_image'],$layout_single);
                $layout_single = str_replace('{{_POST_TITLE}}',$blog['the_title'],$layout_single);
                $layout_single = str_replace('{{_POST_DATE}}',date('F j, Y', strtotime($blog['the_date'])),$layout_single);
                $layout_single = str_replace('{{_POST_DESCRIPTION}}',$blog['the_description'],$layout_single);
                
                while ($blog = mysql_fetch_assoc($query2)) {
                    $recent_posts .= '<li><a href="/blob/'.$blog['the_url'].'">'.$blog['the_title'].'</a></li>';  
                }
                
                $layout = str_replace('{{_BLOG_CONTENT}}',$layout_single,$layout);
                $layout = str_replace('{{_RECENT_POSTS}}',$recent_posts,$layout);
            }
            
            
            
    return $layout;

}
?>