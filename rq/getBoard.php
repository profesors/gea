<?php
include_once('libSql.php');
connectDB();
$idBoard = secure_param('idBoard');
#$idBoard = 1;

# Get Board
//echo get_board($idBoard);
$ret = get_board($idBoard);
echo json_encode($ret, JSON_NUMERIC_CHECK);
