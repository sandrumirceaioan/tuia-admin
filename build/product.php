<?php
function buildproduct($url,$type) {
        
        $layout = file_get_contents('html/product.html');
        
        //single product details
            $query = mysql_query("SELECT * FROM main_table WHERE the_type = '".$type."' AND the_url = '".$url."'");
            $product = mysql_fetch_assoc($query);
            $category_id = $product['the_id'];
            
            $robots = ($product['the_robots'] ==  0) ? 'NOINDEX, NOFOLLOW' : 'INDEX, FOLLOW';
            
            $layout = str_replace('{{_SINGLE_PRODUCT_URL}}',$product['the_url'],$layout);
            
            $img_split = explode(',',$product['the_image']);
            
            $layout = str_replace('{{_SINGLE_PRODUCT_IMAGE}}',$img_split[0],$layout);
                            
                $imglist = "";
                foreach ($img_split as $key => $value) {
                        $imglist .= '<li><a href="images/products/'.$value.'"><img src="images/products/'.$value.'" alt="" /></a></li>';
                }
                
                                        
            $layout = str_replace('{{_SINGLE_PRODUCT_IMAGES}}',$imglist,$layout);
            
            $layout = str_replace('{{_SINGLE_PRODUCT_TITLE}}',$product['the_title'],$layout);
            $layout = str_replace('{{_SINGLE_PRODUCT_PRICE}}',$product['the_newprice'],$layout);
            $layout = str_replace('{{_SINGLE_PRODUCT_OLDPRICE}}',$product['the_oldprice'],$layout);
            
            $stock = ($product['the_stock'] > 0) ? '<span style="color:#009B00;">In stoc</span>' : '<span style="color:#ff0000;">Nu este in stoc</span>';
            $layout = str_replace('{{_SINGLE_PRODUCT_STOCK}}',$stock,$layout);
            
            $layout = str_replace('{{_SINGLE_PRODUCT_SHORTDESCRIPTION}}',$product['the_shortdescription'],$layout);
            
            
            $addtocart = '
            <form class="variations_form cart" action="cart" onsubmit="return false">
            <div class="cantitate">
            <input type="number" size="4" class="quantity" title="Cantitate" value="1" name="qty" min="1">
            <input type="hidden" size="4" value="'.$product['the_id'].'" name="pid">
            </div>
            <span class="quantity-label">Cantitate:</span>
            <button class="wr-btn wr-large-btn single_add_to_cart_button"><i class="fa fa-shopping-cart"></i> Adauga in cos</button>
            </form>
            ';
            
            $layout = str_replace('{{_SINGLE_PRODUCT_ADDTOCART}}',$addtocart,$layout);
            
            
            $layout = str_replace('{{_SINGLE_PRODUCT_DESCRIPTION}}',$product['the_description'],$layout);
            $layout = str_replace('{{_ROBOTS}}',$robots,$layout);
            

            
                        
    return $layout;
}
?>