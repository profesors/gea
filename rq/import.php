<?php
include_once('libSql.php');
include_once('libControllers.php');
connectDB();

reset_db();
$files = array("medusa", "baddon1");

$token_id=1;
foreach($files as $file){
	global $db;
	# Import tokens to database
	$board_file = json_decode(file_get_contents('../systems/lmde/boards/'.$file.'.json'));
	$idBoard = insert_board($board_file);
	foreach($board_file->tokens as $token_in_board){
		$token_json = json_decode(file_get_contents('../systems/lmde/tokens/'.$token_in_board->file.'.json'));
		$token_json->x = $token_in_board->x;
		$token_json->y = $token_in_board->y;
		$token_json->name = $token_in_board->name;

		if (!property_exists($token_in_board, 'default_guideline_id')){
			$token_in_board->default_guideline_id = 0;
		}
		insert_token($token_id,$idBoard, $token_json->name, $token_json->x, $token_json->y, 1, $token_json->w, 
			$token_json->h, $token_json->img, $token_json->border, 
			$token_json->pc, $token_in_board->file, $token_json->pc, $token_in_board->default_guideline_id);
		foreach($token_json->attrs as $k => $v){
			set_attr($idBoard, $token_json->name, $k, $v);
		}
		foreach($token_json->guidelines as $guideline){
			set_guideline($idBoard, $token_json->name, $guideline);
		}
		if (property_exists($token_json, 'steps')){
			foreach($token_json->steps as $k => $step){
				insert_steps($idBoard, $token_json->name, $k, $step); 
			}
		}
		if (property_exists($token_json, 'inventory')){
			foreach($token_json->inventory as $inv){
				insert_inventory($token_id, $inv->name, $inv->n, $inv->position, $inv->function);
			}
		}
		$token_id++;
	}
}
$board = get_board($idBoard);
$im_walls = imagecreatefrompng("../img/bg/".$board->bg."_walls.png");
$im_full = imagecreatefromjpeg("../img/bg/".$board->bg."_full.jpg");
//apply_lights($board, $im_walls, $im_full);
