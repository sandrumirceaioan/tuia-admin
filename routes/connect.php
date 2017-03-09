<?php
//CONECT SQL; SELECT DB;
$hostname = 'localhost';
$username = 'mircica_tuia';
$password = 'rappac33!';
$database = 'test'; 

$conexiune = mysqli_connect($hostname,$username,$password) or die('Eroare Conexiune!');
$db_select_db = mysqli_select_db($conexiune,$database) or die ('Eroare selectare baza de date!');
//END CONECT SQL; SELECT DB;
?>
