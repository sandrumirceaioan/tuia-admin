<?php
session_start();
include ('connect.php');
if (!empty($_POST['nume_client']) and 
    !empty($_POST['prenume_client']) and 
    !empty($_POST['email_client']) and
    !empty($_POST['tel_client']) and
    !empty($_POST['adr_client']) and
    !empty($_POST['oras_client']) and
    !empty($_POST['jud_client'])) {

$nume_c  = mysql_real_escape_string($_POST['nume_client']);
$prenume_c  = mysql_real_escape_string($_POST['prenume_client']);
$email_c  = mysql_real_escape_string($_POST['email_client']);
$tel_c  = mysql_real_escape_string($_POST['tel_client']);
$adr_c  = mysql_real_escape_string($_POST['adr_client']);
$oras_c  = mysql_real_escape_string($_POST['oras_client']);
$jud_c  = mysql_real_escape_string($_POST['jud_client']);
$txt_c  = mysql_real_escape_string($_POST['txt_client']);

if (!filter_var($email_c, FILTER_VALIDATE_EMAIL)) {
    echo 'err';
    die();
};

if (strlen($tel_c) < 10) {
    echo 'err';
    die ();
}
    
    
$order_id_detail = substr(mt_rand(),0,6);
$od = date('m / d / Y');
    
$insert1 = mysql_query("INSERT INTO orders (oid , onume , oprenume , oemail , otel , oadresa , ooras , ojudet , oprefer , order_date , odetail_id) VALUES ('' , '".$nume_c."' , '".$prenume_c."' , '".$email_c."' , '".$tel_c."' , '".$adr_c."' , '".$oras_c."' , '".$jud_c."' , '".$txt_c."' , '".$od."' , '".$order_id_detail."')");


foreach ($_SESSION as $name => $value) {
    $id = substr($name,5, strlen($name - 5));
    $query = mysql_query("SELECT * FROM main_table WHERE the_id=".$id."");
    $det_prod = mysql_fetch_assoc($query);
    $qty_pp = $value * $det_prod['the_newprice'];
    
$insert2 = mysql_query("INSERT INTO odetails_id (iidd, order_detail_id , detail_name , detail_sort , detail_qty , detail_price) VALUES ('', '".$order_id_detail."' , '".$det_prod['the_title']."', '".$det_prod['the_summary']."' , '".$value."' , '".$qty_pp."')");
    }

//start - send emails
$mailc = $_POST['email_client'];
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$message = "
<table>
<tr>
<td><img src=\"http://www.tuiasmaragd.ro/imagini/logo.png\"></td>
</tr>
<tr>
<td>".$_POST['nume_client'].", comanda efectuata pe www.tuiasmaragd.ro a fost inregistrata! <br />Pentru informatii suplimentare referitoare la costurile de livrare/durata de livrare, te rugam sa ne contactezi la tel: 0747929875.</td>
</tr>

</table>
";
$message1 = 'Comanda noua boss!!!';
mail($mailc,'Comanda Noua pe www.tuiasmaragd.ro',$message,$headers);
mail('mircea.sandru@gosocialdev.eu','Comanda Noua pe www.tuiasmaragd.ro',$message1,$headers); 
//end - send emails

session_destroy();

    if ($insert1 and $insert2) {
  
        session_destroy();
        echo 'ok';
  
    } else {
    echo 'no';
    }

} else {
    
    echo 'emp';
    
}


?>