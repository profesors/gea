<?php
include('../lib.php');

connectDB();

$idBoard = secure_param('idBoard');
#$idBoard = 3;
$lastId = read_last_actionId($idBoard);
$bg_ts = get_bg_ts($idBoard);
echo "$lastId $bg_ts";
