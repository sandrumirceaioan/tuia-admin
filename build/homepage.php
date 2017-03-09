<?php
function buildhomepage($url,$type) {
    
        $layout = file_get_contents('html/homepage.html');
        $layout_product_fresh = file_get_contents('html/homepage-item.html');
        $layout_list_fresh = file_get_contents('html/homepage-blog-item.html');
        
            $query = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_url = '".$url."'");
            $home = mysql_fetch_assoc($query);
        
            $layout = str_replace('{{_HOMEPAGE_DESCRIPTION}}',$home['the_description'],$layout);
            
            //START homepage product listing
            $products = mysql_query("SELECT * FROM main_table WHERE the_type = 2 AND the_category = 6 ORDER BY the_order ASC");
            
            $homepage_product_list = "";
            $form_number = 0;
            while ($product = mysql_fetch_assoc($products)) {
                
                $layout_product = $layout_product_fresh;
                $stock = ($product['the_stock'] > 0) ? '<span style="color:#009B00;">In stoc</span>' : '<span style="color:#ff0000;">Nu este in stoc</span>';
                if ($product['the_stock'] > 0) {
                        $add_button = '
                        <form class="addto_list" onsubmit="return false">
                        <input type="hidden" name="pid" value="'.$product['the_id'].'">
                        <button type="submit" class="add-to-cart-button for_ajax"><i class="fa fa-shopping-cart"></i> Adauga in cos</button>
                        <input type="number" name="qty" class="qtycat" min="1" value="1"><span class="cant">Selecteaza<br />cantitate:</span>
                        </form>';
                } else {
                        $add_button = '<span>in curand in stoc...</span>';
                }
                
                $stock = ($product['the_stock'] > 0) ? 'In stoc' : 'Nu este in stoc';
                $layout_product = str_replace('{{_HOMEPAGE_PRODUCT_URL}}',$product['the_url'],$layout_product);
                
                $img_split = explode(',',$product['the_image']);
                
                $layout_product = str_replace('{{_HOMEPAGE_PRODUCT_IMAGE}}',$img_split[0],$layout_product);
                $layout_product = str_replace('{{_HOMEPAGE_PRODUCT_TITLE}}',$product['the_title'],$layout_product);
                $layout_product = str_replace('{{_HOMEPAGE_PRODUCT_PRICE}}',$product['the_newprice'],$layout_product);
                $layout_product = str_replace('{{_HOMEPAGE_PRODUCT_SHORT_DESCRIPTION}}',$product['the_shortdescription'],$layout_product);
                $layout_product = str_replace('{{_HOMEPAGE_PRODUCT_STOCK}}',$stock,$layout_product);
                $layout_product = str_replace('{{_HOMEPAGE_PRODUCT_SUMMARY}}',$product['the_summary'],$layout_product);
                $layout_product = str_replace('{{_HOMEPAGE_ADDTOCART}}',$add_button,$layout_product);
                
                $homepage_product_list .= $layout_product;
                
            }
            
            //START homepage blog posts
            $query2 = mysql_query("SELECT * FROM main_table WHERE the_type = 4 AND the_parent = 16 ORDER BY the_id ASC LIMIT 3");
            
            while ($blog = mysql_fetch_assoc($query2)) {
                    
                    $layout_list = $layout_list_fresh;
                    $layout_list = str_replace('{{_HOME_BLOG_IMAGE}}',$blog['the_image'],$layout_list);
                    $layout_list = str_replace('{{_HOME_BLOG_URL}}',$blog['the_url'],$layout_list);
                    $layout_list = str_replace('{{_HOME_BLOG_TITLE}}',$blog['the_title'],$layout_list);                   
                    $layout_list = str_replace('{{_HOME_BLOG_DATE}}',date('F j, Y', strtotime($blog['the_date'])),$layout_list);
                    $layout_list = str_replace('{{_HOME_BLOG_SHORT}}',$blog['the_shortdescription'],$layout_list);
                 
                    $blog_product_list .= $layout_list;
                    
                }
                
            $layout = str_replace('{{_HOMEPAGE_ITEMS}}',$homepage_product_list,$layout);
            $layout = str_replace('{{_HOMEPAGE_BLOG_ITEMS}}',$blog_product_list,$layout);
    
    return $layout;
}
?>