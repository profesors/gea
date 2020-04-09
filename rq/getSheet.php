<?php
include_once('sqlLib.php');

connectDB();

$idBoard = secure_param('idBoard');
$name = secure_param('name');

echo file_get_contents("../sheets/$name.html");
