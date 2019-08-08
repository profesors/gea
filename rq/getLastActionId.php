<?php
include('../lib.php');

connectDB();

$idBoard = secure_param('idBoard');
//$idBoard = 2;
$lastId = read_last_actionId($idBoard);
echo $lastId;
