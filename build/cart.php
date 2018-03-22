<?php
function buildcart($url,$type) {
        
        $layout = file_get_contents('html/cart.html');
        $layout_item_fresh = file_get_contents('html/cart-item.html');
        


foreach ($_SESSION as $name => $value) {
	
        $layout_item = $layout_item_fresh; 
		$totalQty += $value;
                
                //pentru fiecare sesiune cart_xx / fiecare produs din cart:
		if ($value > 0) { //daca nu sunt sesiuni salvate -> cart-ul este gol!
		if (substr(($name),0,5) == 'cart_') { // vrificam ca sesiunea salvata sa fie cea referitoare la cart
		$id = substr($name,5, strlen($name - 5)); // extragem id-ul produsului din numele sesiunii
		$query = mysql_query("SELECT * FROM main_table WHERE the_id='".$id."'"); //scoatem din baza de date toate informatiile produsului cu id-ul: $id
			
			while ($row = mysql_fetch_assoc($query)) {
				$total = $row['the_newprice'] * $value;
								
                                
                                $layout_item = str_replace('{{ITEM_URL}}',$row['the_url'],$layout_item);
                                
                                $img_json = json_decode($row['the_image'], true);
                                
                                $layout_item = str_replace('{{ITEM_IMAGE}}',$img_json[0]['image'],$layout_item);
                                $layout_item = str_replace('{{ITEM_TITLE}}',$row['the_title'],$layout_item);
                                $layout_item = str_replace('{{ITEM_SHORT_DESCRIPTION}}',$row['the_shortdescription'],$layout_item);
                                
                                $update = '<a class="arem" href="add-remove.php?remove='.$id.'">-</a> '.$value.' <a class="aadd" href="add-remove.php?add='.$id.'">+</a>';
                                
                                $layout_item = str_replace('{{ITEM_UPDATE_QTY}}',$update,$layout_item);
                                $layout_item = str_replace('{{ITEM_PRICE_UNIT}}',$row['the_newprice'],$layout_item);
                                $layout_item = str_replace('{{ITEM_PRICE}}',number_format($total, 0, ' ', '.'),$layout_item);
                                
                                $remove = '<a href="delete.php?delete='.$id.'" class="delete_item" title="Scoate din cos">x</a>';
                                
                                $layout_item = str_replace('{{ITEM_REMOVE}}',$remove,$layout_item);

			}
			echo '</tr>';
		}
		$gtotal = $gtotal + $total;
	}
      
	if ($value > 0) {
	
        $items_list .= $layout_item;
        
	}
}


$total_div = '
                    <div class="col-md-4 cart_totals">
                        <div class="box-inner">
                            <form action="#">
                                <table>
                                    <tr class="cart-total">
                                        {{CART_GRAND_TOTAL}}
                                    </tr>
                                </table>
                                
                                <p><input class="submit-btn" type="submit" name="" value="Checkout"></p>
                            </form>
                        </div>
                    </div><!-- end discount -->
';

if ($gtotal == 0) {
session_destroy();
$layout = str_replace('{{_CART_ITEMS}}','<h2>Nu aveti nici un produs in cos!</h2>',$layout);
$total_div = '<p class="continue-shop"><a href="/produse">Inapoi la produse</a></p>';

} else {

$layout = str_replace('{{_CART_ITEMS}}',$items_list,$layout);  

if ($totalQty < 5) {
	$need = 5 - $totalQty;
	$total_div = '
                <div class="col-md-2">
		<p class="continue-shop"><a href="/produse">Inapoi la produse</a></p>
                </div>
                <div class="col-md-6"></div>
                    <div class="col-md-4 cart_totals">
                        <div class="box-inner">
                            <form action="#">
                                <table>
                                    <tr class="cart-total">
                                        <th>TOTAL</th><td>'.number_format($gtotal, 0, ' ', '.').' Lei</td>
                                    </tr>
                                </table>
                            </form>
			    <a class="finish-btn-warning">Cantitate minima 5<br /> <small><i>adauga in cos inca</i></small> '.$need.'</a>
                        </div>
                    </div><!-- end discount -->
';
} else {
      
$total_div = '
                <div class="col-md-2">
		<p class="continue-shop"><a href="/produse">Inapoi la produse</a></p>
                </div>
                <div class="col-md-6"></div>
                    <div class="col-md-4 cart_totals">
                        <div class="box-inner">
                            <form action="#">
                                <table>
                                    <tr class="cart-total">
                                        <th>TOTAL</th><td>'.number_format($gtotal, 0, ' ', '.').' Lei</td>
                                    </tr>
                                </table>
                            </form>
			    <a class="finish-btn" href="/comanda">Finalizeaza Comanda</a>
                        </div>
                    </div><!-- end discount -->
';
}
}

$layout = str_replace('{{CART_GRAND_TOTAL}}',$total_div,$layout);


return $layout;
}
?>