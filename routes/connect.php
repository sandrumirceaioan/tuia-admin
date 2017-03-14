<?php
//CONECT SQL; SELECT DB;
$hostname = 'localhost';
$username = 'mircica_tuia';
$password = 'rappac33!';
$database = 'test';

$conexiune = mysqli_connect($hostname,$username,$password,$database) or die('Eroare Conexiune!');
?>
