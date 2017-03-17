<?php
function buildcategory($url,$type) {
        
        $layout = file_get_contents('html/category.html');
        $layout_product_fresh = file_get_contents('html/category-item.html');
                   
            //category page details
            $query = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_url = '".$url."'");
            $category_content = mysql_fetch_assoc($query);
            $category_id = $category_content['the_id'];
            
            $robots = ($category_content['the_robots'] ==  0) ? 'NOINDEX, NOFOLLOW' : 'INDEX, FOLLOW';
            $layout = str_replace('{{_CATEGORY_DESCRIPTION}}',$category_content['the_description'],$layout);
            $layout = str_replace('{{_CATEGORY_SHORTDESCRIPTION}}',$category_content['the_shortdescription'],$layout);
            $layout = str_replace('{{_CATEGORY_SUMMARY}}',$category_content['the_summary'],$layout);
            $layout = str_replace('{{_ROBOTS}}',$robots,$layout);
            
            //START category product listing
            $products = mysql_query("SELECT * FROM main_table WHERE the_type = 2 AND the_category = '".$category_id."' ORDER BY the_order ASC");
            
            $category_product_list = "";
            
            while ($product = mysql_fetch_assoc($products)) {
                
                $layout_product = $layout_product_fresh;
                $stock = ($product['the_stock'] > 0) ? '<span style="color:#009B00;">In stoc</span>' : '<span style="color:#ff0000;">Nu este in stoc</span>';
                if ($product['the_stock'] > 0) {
                        $add_button = '
                        <form class="addto_list" action="cart" onsubmit="return false">
                        <input type="hidden" name="pid" value="'.$product['the_id'].'">
                        <button type="submit" class="add-to-cart-button for_ajax"><i class="fa fa-shopping-cart"></i> Adauga in cos</button>
                        <input type="number" name="qty" class="qtycat" min="1" value="1"><span class="cant">Selecteaza<br />cantitate:</span>
                        </form>                     

                        
                        ';
                } else {
                        $add_button = '<span>in curand in stoc...</span>';
                }
                
                
                $layout_product = str_replace('{{_CATEGOTY_PRODUCT_URL}}',$product['the_url'],$layout_product);
                
                $img_json = json_decode($product['the_image'], true);
                
                $layout_product = str_replace('{{_CATEGOTY_PRODUCT_IMAGE}}',$img_json[0]['image'],$layout_product);
                $layout_product = str_replace('{{_CATEGOTY_PRODUCT_TITLE}}',$product['the_title'],$layout_product);
                $layout_product = str_replace('{{_CATEGOTY_PRODUCT_PRICE}}',$product['the_newprice'],$layout_product);
                $layout_product = str_replace('{{_CATEGOTY_PRODUCT_SHORT_DESCRIPTION}}',$product['the_shortdescription'],$layout_product);
                $layout_product = str_replace('{{_CATEGOTY_PRODUCT_STOCK}}',$stock,$layout_product);
                $layout_product = str_replace('{{_CATEGOTY_PRODUCT_SUMMARY}}',$product['the_summary'],$layout_product);
                $layout_product = str_replace('{{_CATEGORY_ADDTOCART}}',$add_button,$layout_product);
                
                $category_product_list .= $layout_product;
                
            }
            
            $layout = str_replace('{{_CATEGORY_ITEMS}}',$category_product_list,$layout);
            //END category product listing
            
    return $layout;
}
?>