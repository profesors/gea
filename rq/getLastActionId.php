<?php
include_once('libSql.php');

connectDB();
$idBoard = secure_param('idBoard');

$idBoard = 1;

$lastId = read_last_actionId($idBoard);
$bg_ts = get_bg_ts($idBoard);
$q = "SELECT * FROM boards WHERE id=$idBoard LIMIT 1";
$result = run_sql($q) or die();
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$ret = new stdClass();
$ret->id = $row['lastActionId'];
$ret->bgTs = $bg_ts;
$ret->turn = $row['turn'];
echo json_encode($ret, JSON_NUMERIC_CHECK);
