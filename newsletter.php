<?php
include("connect.php");
$mailu = mysql_real_escape_string($_POST['email']);
$place = mysql_real_escape_string($_POST['place']);

if (!filter_var($mailu, FILTER_VALIDATE_EMAIL)) {
    echo 'err';
    die();
};
   
$insert = mysql_query("INSERT INTO newsletter_table (the_id, the_email, the_page, the_bridge) VALUES ('', '".$mailu."', '".$place."', '')");

if ($insert) {
  echo 'ok';
} else {
  echo 'not';
}

?>