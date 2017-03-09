<?php
include('build/header.php');
include('build/product.php');
include('build/footer.php');

$header = buildheader($url,$type);
$prod = buildproduct($url,$type);
$footer = buildfooter($url,$type);

echo $header;
echo $prod;
echo $footer;
?>

<script>
jQuery(document).ready(function() {
// process the form
jQuery(".cart").submit(function(event) {
event.preventDefault();
jQuery.ajax({
                url: "/cart.php",
                dataType: "json",
                type: "POST",
                data: { pid: jQuery("form.cart input[name=pid]").val(),
                        qty: jQuery("form.cart input[name=qty]").val()
                },        
                success: function(data) {                       
                    
                    if (data.success == true) {
                        
                        //successfully added to cart
                        jQuery(".coverall").show();
                        jQuery(".message_cart").append("<i class=\"fa fa-check-circle\"></i><p>" + data.message + "</p>");
                        jQuery(".message_cart").append("<a href=\"/cart\">Cos de cumparaturi</a><a class=\"exit_pop\">Continua cumparaturile</a>");
                        jQuery(".message_cart").fadeIn();
                        
                        //continue shopping
                        jQuery(".exit_pop, .coverall").click(function(){
                        jQuery(".message_cart").fadeOut();
                        jQuery(".message_cart").empty();
                        jQuery(".coverall").hide();
                        jQuery(".buy-now-btn").css("display","block");
                        });
                     
                   } else {
                   
                        alert (data.errors.qty);
                        
                   }
                        
                } 
                
            });
});
});
</script>