<?php
//CONECT SQL; SELECT DB;
$hostname = 'localhost';
$username = 'mircica_tuia';
$password = 'eZfMd6#Fq]+R';
$database = 'mircica_tuia';

$conexiune = mysql_connect($hostname,$username,$password) or die('Eroare Conexiune!');
$db_select = mysql_select_db($database,$conexiune) or die ('Eroare selectare baza de date!');
//END CONECT SQL; SELECT DB;
?>
