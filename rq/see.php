<?php
include_once('libSql.php');
include_once('libControllers.php');

connectDB();
setup_lang();
$idBoard = secure_param('idBoard');
$name = secure_param('name');

$idBoard = 1;
$name1 = "elf";
$name2 = "o1";

$token1 = get_token($idBoard, $name1);
$token2 = get_token($idBoard, $name2);
$board = get_board($idBoard);
$im = imagecreatefrompng("../img/bg/010bg_walls.png");
print_r($token1);die();

#print_r($token1);
#print_r($board);
#
$n = get_number_of_corners_in_token($token2);
$visible = $n-min_hidden_corners_visible($token1, $token2, $board);
echo "VISIBLE CORNERS $visible\n";

