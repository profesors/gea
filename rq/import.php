<?php
include_once('libSql.php');
connectDB();

reset_db();
# Import tokens to database
$board = json_decode(file_get_contents('../systems/lmde/boards/elven_tower.json'));
$idBoard = insert_board($board);
foreach($board->tokens as $token_in_board){
	$token = json_decode(file_get_contents('../systems/lmde/tokens/'.$token_in_board->file.'.json'));
	$token->x = $token_in_board->x;
	$token->y = $token_in_board->y;
	$token->name = $token_in_board->name;
	if (!property_exists($token_in_board, 'default_guideline_id')){
		$token_in_board->default_guideline_id = 0;
	}
	insert_token($idBoard, $token->name, $token->x, $token->y, 1, $token->w, $token->h, $token->img, $token->border, 
		$token_in_board->file, $token_in_board->default_guideline_id);
	foreach($token->attrs as $k => $v){
		set_attr($idBoard, $token->name, $k, $v);
	}
	foreach($token->guidelines as $guideline){
		set_guideline($idBoard, $token->name, $guideline);
	}
}
