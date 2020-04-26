<?php
include_once('libSql.php');
include_once('libControllers.php');

connectDB();
setup_lang();

$idBoard = secure_param('idBoard');
$name = secure_param('name');

$idBoard = 1;
$name1 = "bar";
$name2 = "elf";

$token1 = get_token($idBoard, $name1);
$token2 = get_token($idBoard, $name2);


