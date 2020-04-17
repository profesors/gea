<?php
include_once('libSql.php');

connectDB();

$idBoard = secure_param('idBoard');
$name = secure_param('name');

echo file_get_contents("../sheets/$name.html");
