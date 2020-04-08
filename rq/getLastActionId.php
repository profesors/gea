<?php
include('../lib.php');

connectDB();
$idBoard = secure_param('idBoard');

# $idBoard = 4;

$lastId = read_last_actionId($idBoard);
$bg_ts = get_bg_ts($idBoard);
echo '{';
echo ' "id": '.$lastId.',' ;
echo ' "bgTs": '.$bg_ts;
echo '}';
