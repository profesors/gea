<?php
include_once('libSql.php');
connectDB();

reset_db();
# Import tokens to database
$board = json_decode(file_get_contents('../boards/caravana.json'));
$idBoard = insert_board($board);
foreach($board->tokens as $token_in_board){
	# $t is the $token
	$t = json_decode(file_get_contents('../tokens/'.$token_in_board->file.'.json'));
	$t->x = $token_in_board->x;
	$t->y = $token_in_board->y;
	$t->name = $token_in_board->name;
	insert_token($idBoard, $t->name, $t->x, $t->y, 1, $t->w, $t->h, $t->img, $t->border);
	foreach($t->attrs as $k => $v){
		set_attr($idBoard, $t->name, $k, $v);
	}
	foreach($t->guidelines as $guideline){
		set_guideline($idBoard, $t->name, $guideline);
	}
}
