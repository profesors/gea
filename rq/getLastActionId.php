<?php
include_once('libSql.php');

connectDB();
$idBoard = secure_param('idBoard');

#$idBoard = 1;

$bg_ts = get_bg_ts($idBoard);
$board = get_board($idBoard);
$game = get_game(1);
$ret = new stdClass();
$ret->id = $board->lastActionId;
$ret->bgTs = $bg_ts;
$ret->turn = $board->turn;
$ret->boardId = $game['board_id'];
echo json_encode($ret, JSON_NUMERIC_CHECK);
