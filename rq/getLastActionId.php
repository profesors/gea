<?php
include_once('sqlLib.php');

connectDB();
$idBoard = secure_param('idBoard');

# $idBoard = 4;

$lastId = read_last_actionId($idBoard);
$bg_ts = get_bg_ts($idBoard);
$ret = new stdClass();
$ret->id = $lastId;
$ret->bgTs = $bg_ts;
echo json_encode($ret, JSON_NUMERIC_CHECK);
