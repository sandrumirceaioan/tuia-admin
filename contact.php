<?php
include("connect.php");
$name = mysql_real_escape_string($_POST['cname']);
$email = mysql_real_escape_string($_POST['cemail']);
$message = mysql_real_escape_string($_POST['ctarea']);
    
if (empty($name) or empty($message)) {
    echo 'emp';
    die();
};

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'err';
    die();
};

$t=time();
$status=1;

$insert = mysql_query("INSERT INTO contact_table (the_id, the_date, the_name, the_email, the_message, the_status) VALUES ('', '".date("d-m-Y",$t)."', '".$name."', '".$email."', '".$message."', '".$status."')");

if ($insert) {
  echo 'ok';
} else {
  echo 'no';
}

?>