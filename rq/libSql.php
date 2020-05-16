<?php

$db = null;

function connectDB(){
	global $db;
	// Host, user, passwd, db_name
	if (!array_key_exists('REMOTE_ADDR', $_SERVER)){
		$db = mysqli_connect("localhost", "gea", "gea", "gea");
	} else 
		if ($_SERVER['REMOTE_ADDR']=='127.0.0.1'){
			$db = mysqli_connect("localhost", "gea", "gea", "gea");
		} else {
			$db = mysqli_connect("db5000148109.hosting-data.io:3306", "dbu120009", "S4!4m4nc4", "dbs143332");
		}
	
	if (!$db){
		echo "ERROR: Cannot connect to DB\n";
		die();
	} 
}

function reset_db(){
	$query = "TRUNCATE actions;";
	run_sql($query) or die();
	$query = "TRUNCATE attrs;";
	run_sql($query) or die();
	$query = "TRUNCATE boards;";
	run_sql($query) or die();
	$query = "TRUNCATE guidelines;";
	run_sql($query) or die();
	$query = "TRUNCATE tokens;";
	run_sql($query) or die();
	$query = "TRUNCATE animations;";
	run_sql($query) or die();
	$query = "TRUNCATE output;";
	run_sql($query) or die();
	$query = "TRUNCATE steps;";
	run_sql($query) or die();
	$query = "TRUNCATE mods;";
	run_sql($query) or die();
	$query = "TRUNCATE inventory;";
	run_sql($query) or die();
}

function secure_param($name){
	return (array_key_exists($name, $_GET))?$_GET[$name]:NULL;
}

function run_sql($query){
	global $db;
	$result = mysqli_query($db, $query);
	if ($result == false){
		error_log("ERROR DB: $query");
		error_mysqli($query);
	}
	return $result;
}

function error_mysqli($query){
	global $db;
    echo "ERROR ".mysqli_errno($db).': '.mysqli_error($db).' with query: '.$query;
}

function getTime(){
	$sRet = '<time>'.date('G:i').'</time>';
	return $sRet;
}

function write_last_actionId($idBoard, $actionId){
	$query = "UPDATE boards SET lastActionId=$actionId WHERE id=$idBoard;";
	run_sql($query) or die();
}

function increase_last_actionId($idBoard, $ammount){
	$query = "UPDATE boards SET lastActionId = lastActionId + $ammount WHERE id=$idBoard;";
	run_sql($query) or die();
}
function read_last_actionId($idBoard){
	$query = "SELECT lastActionId FROM boards WHERE id=$idBoard LIMIT 1;";
	$result = run_sql($query) or die();
	$lastId=0;
	if ($result->num_rows > 0){
		$arr = mysqli_fetch_array($result, MYSQLI_ASSOC);
		$lastId = $arr['lastActionId'];
	}
	return $lastId;
}

function get_board($idBoard){
	$query = "SELECT * FROM boards WHERE id = $idBoard LIMIT 1;";
	$result = run_sql($query) or die();
	$row = mysqli_fetch_array($result);
	$ret = new stdClass();
	$ret->id = $row['id'];
	$ret->name = $row['name'];
	$ret->tilew = $row['tilew'];
	$ret->tileh = $row['tileh'];
	$ret->ntilesw = $row['ntilesw'];
	$ret->ntilesh = $row['ntilesh'];
	$ret->offsetx = $row['offsetx'];
	$ret->offsety = $row['offsety'];
	$ret->bg = $row['bg'];
	$ret->bgTs = get_bg_ts($idBoard);
	$ret->drawGrid = $row['drawGrid'];
	$ret->lastActionId = $row['lastActionId'];
	$ret->turn = $row['turn'];
	return $ret;
}

# Inser action in the DB table
function insert_action($idBoard, $text){
	global $db;
	$query = "SELECT MAX(number) FROM actions WHERE idBoard=$idBoard AND idUser=1 LIMIT 1";
	$result = run_sql($query) or die();
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$next = intval($row['MAX(number)'])+1;
	$query = "INSERT INTO `actions` (`idUser`, `idBoard`, `number`, `ts`, `action`) VALUES (1, $idBoard,";
	#$query.= " $next, CURRENT_TIMESTAMP, '".mysqli_real_escape_string($db, $m)."');";
	$query.= " $next, CURRENT_TIMESTAMP, \"".str_replace('"','\'',$text).'")';
	
	run_sql($query) or die();
}

function set_guideline($idBoard, $tokenName, $guideline){
	if (!property_exists($guideline, 'n')) $guideline->n = -1;
	if (!property_exists($guideline, 'maxn')) $guideline->maxn = -1;
	$query = "INSERT INTO `guidelines` (idBoard, tokenName, guideNumber, name, icon, guideAction, n, maxn) ";
	$query.= "VALUES ($idBoard, '$tokenName', $guideline->number, '$guideline->name', '$guideline->icon'";
	$query.= ", '$guideline->action', ";
	$query.= " $guideline->n, $guideline->maxn) ";
	$query.= " ON DUPLICATE KEY UPDATE guideAction='$guideline->action'";
	run_sql($query) or die();
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "UPDATE tokens SET actionId=$nextActionId WHERE idBoard=$idBoard";
    $query.= " AND name='$tokenName'";
	run_sql($query) or die();
	increase_last_actionId($idBoard, 1);
}

function guideline_remove_counter($idBoard, $tokenName, $guideNumber){
	$query = "UPDATE guidelines SET n=n-1 WHERE idBoard=$idBoard AND tokenName='$tokenName' AND guideNumber=$guideNumber";
	run_sql($query) or die();
	increase_last_actionId($idBoard, 1);
}

function guideline_get_n($idBoard, $tokenName, $guideNumber){
	$query = "SELECT n FROM guidelines WHERE idBoard=$idBoard AND tokenName='$tokenName' AND guideNumber=$guideNumber";
	$result = run_sql($query) or die();
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
	return $row['n'];
}

# Insert token in database, if there is not $img_src or $border ignore it
# If the token id is duplicate, just update it
function insert_token($token_id, $idBoard, $name, $x, $y, $z, $w, $h, $img_src, $border, $opacity, $file, $pc, $default_guideline_id){
	$name = ($name=='')?'NULL':$name;
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "INSERT INTO `tokens` (token_id, `idBoard`,`name`,file,pc,`x`,`y`,`z`,`w`,`h`,`step`,`img`,`border`,";
	$query.= " opacity, `actionId`, ";
	$query.= " defaultGuideline)";
	$query.= " VALUES ($token_id, '$idBoard', '$name', '$file',$pc, $x, $y, $z, $w, $h, 1, ";
	$query.= "'$img_src', '$border', $opacity,$nextActionId, $default_guideline_id) ";
	$query.= " ON DUPLICATE KEY UPDATE x=$x, y=$y";
	if ($img_src != ''){
		$query.= ", img='$img_src'";
	}
	if ($border != ''){
		$query.= ", border='$border'";
	}
	run_sql($query) or die();
	increase_last_actionId($idBoard, 1);
}


function move_token($idBoard, &$token, $x, $y, $im){
	$board = get_board($idBoard);
	$name = ($token['name']=='')?'NULL':$token['name'];
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "UPDATE `tokens` SET x=$x, y=$y, actionId=$nextActionId WHERE idBoard=$idBoard AND ";
	$query.= " name='".$token['name']."'";
	run_sql($query) or die();
	increase_last_actionId($idBoard, 1);
	$token['x'] = $x;
	$token['y'] = $y;
}

function move_token_by_path($idBoard, &$token, $arrPath_tiles, $im_walls){
	$board = get_board($idBoard);
	$path = '';
	$turn = get_turn($idBoard);
	for ($i=0; $i<sizeof($arrPath_tiles); $i++){
		$x = $arrPath_tiles[$i]['x'];
		$y = $arrPath_tiles[$i]['y'];
		$is_visible = isVisible_between_tiles($board, $im_walls, $token, $x, $y);
		if ($is_visible){
			$is_free = free_from_enemy_in_tile($idBoard, $token, $x, $y);
			if ($is_free){
				$current_d = distance_tiles($token['x'], $token['y'], $x, $y);
				if (floor($current_d)<=1){
					$step = get_step($idBoard, $token['name'], 'movement');
					error_log("STEP ".$step['current']);
					if (($step['current']-$current_d)>=0){
						move_token($idBoard, $token, $arrPath_tiles[$i]['x'], $arrPath_tiles[$i]['y'], false);
						if ($i>0 && $turn>0) {
							mod_step($idBoard, $token['name'], 'movement', -$current_d);
						}	
						$path.=$arrPath_tiles[$i]['x'].','.$arrPath_tiles[$i]['y'].',';
					} else {
						set_output($idBoard, $token['name'], _('NO MOVEMENT'));
						break;
					}
				} else {
					set_output($idBoard, $token['name'], _('CAN NOT PASS'));
					break;
				}
			} else {
				set_output($idBoard, $token['name'], _('CAN NOT PASS'));
				break;
			}
		} else {
			set_output($idBoard, $token['name'], _('BLOCKED SPACE'));
			break;
		}
	}
	$path = trim($path, ',');
	$q = "UPDATE tokens SET path='$path' WHERE idBoard=$idBoard AND name='".$token['name']."'";
	run_sql($q) or die();
	if ($board->lights==1){
		$im_full = imagecreatefromjpeg("../img/bg/".$board->bg."_full.jpg");
		apply_lights($board, $im_walls, $im_full);
	}
}

function set_attr($idBoard, $name, $attr, $val){
	$query = "INSERT INTO attrs (idBoard, tokenName, attr, val) ";
	$query.= "VALUES ($idBoard,'$name','$attr',$val) ";
	$query.= " ON DUPLICATE KEY UPDATE val='$val'";
	run_sql($query) or die();
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "UPDATE tokens SET actionId=$nextActionId WHERE idBoard=$idBoard AND name='$name'";
	run_sql($query) or die();
	increase_last_actionId($idBoard, 1);
}

function set_attr2($token_id, $attr, $val){
	$token = get_token_by_id($token_id);
	$query = "INSERT INTO attrs (idBoard, tokenName, attr, val) ";
	$query.= "VALUES (".$token['idBoard'].",'".$token['name']."','$attr',$val) ";
	$query.= " ON DUPLICATE KEY UPDATE val='$val'";
	run_sql($query) or die();
	$idBoard = $token['idBoard'];
	$tokenName = $token['name'];
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "UPDATE tokens SET actionId=$nextActionId WHERE idBoard=$idBoard AND name='$tokenName'";
	run_sql($query) or die();
	increase_last_actionId($idBoard, 1);
}

function reset_board($idBoard){
	$query = "DELETE FROM actions WHERE idBoard = $idBoard;";
	run_sql($query) or die();
	$query = "UPDATE boards SET lastActionId = 0;";
	run_sql($query) or die();
	$query = "DELETE FROM tokens WHERE idBoard = $idBoard;";
	run_sql($query);
	$query = "DELETE FROM attrs WHERE idBoard = $idBoard;";
	run_sql($query);
	$query = "DELETE FROM guidelines WHERE idBoard = $idBoard;";
	run_sql($query);
}

function set_output($idBoard, $tokenName, $text){
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$q = 'INSERT INTO output (idBoard, tokenName, action_id, text)';
	$q.= " VALUES ($idBoard, '$tokenName', $nextActionId, '$text')";
	$q.= " ON DUPLICATE KEY UPDATE action_id=$nextActionId, text='$text'";
	run_sql($q) or die();
	$q = "UPDATE tokens SET actionId=$nextActionId WHERE idBoard = $idBoard AND name = '$tokenName';";
	run_sql($q) or die();
	increase_last_actionId($idBoard, 1);
}

function get_bg_filename($idBoard){
	$query = "SELECT bg FROM boards WHERE id = $idBoard LIMIT 1;";
	$result = run_sql($query) or die();
	$row = mysqli_fetch_array($result);
	$bg_name = $row['bg'];
	return $bg_name;
}

function get_bg_ts($idBoard){
	$bg_file_name = get_bg_filename($idBoard);
	$bg_ts = filemtime('../img/bg/'.$bg_file_name.'.jpg');
	return $bg_ts;
}

function remove_token($idBoard, $name){
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "UPDATE boards SET lastActionId = $nextActionId";
	run_sql($query) or die();
	/*
	$query = "DELETE FROM tokens WHERE idBoard = $idBoard AND name='$name';";
	run_sql($query);
	$query = "DELETE FROM attrs WHERE idBoard = $idBoard AND tokenName='$name';";
	run_sql($query);
	$query = "DELETE FROM guidelines WHERE idBoard = $idBoard AND tokenName='$name';";
	run_sql($query);
	 */
}

function get_token($idBoard, $name){
	$query = "SELECT * FROM tokens WHERE idBoard=$idBoard AND name='$name' LIMIT 1";
	$result = run_sql($query) or die();
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
	return $row;
}

function get_token_by_id($token_id){
	$query = "SELECT * FROM tokens WHERE token_id=$token_id LIMIT 1";
	$result = run_sql($query) or die();
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
	return $row;
}

function get_token_by_tile($idBoard, $tilex, $tiley){
	$query = "SELECT * FROM tokens WHERE idBoard=$idBoard AND x=$tilex AND y=$tiley LIMIT 1";
	$result = run_sql($query) or die();
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
	return $row;
}

function get_tokens_by_board($idBoard){
	$query = "SELECT * FROM tokens WHERE idBoard=$idBoard";
	$rs = run_sql($query) or die();
	return $rs;
}

function get_tokens_by_pc($idBoard, $pc){
	$query = "SELECT * FROM tokens WHERE idBoard=$idBoard AND pc=$pc";
	$result = run_sql($query) or die();
	return $result;
}

function get_tokens_enemy($idBoard, $pc){
	$query = "SELECT * FROM tokens WHERE idBoard=$idBoard AND pc!=$pc";
	$result = run_sql($query) or die();
	return $result;
}

function get_tokens_big_enemy($idBoard, $pc){
	$q = "SELECT * FROM tokens WHERE idBoard=$idBoard AND pc!=$pc AND (w>1 OR h>1)";
	$result = run_sql($q) or die();
	return $result;
}

function get_npc_hidden_tokens($idBoard){
	$query = "SELECT * FROM tokens WHERE idBoard=$idBoard AND pc=0 AND opacity=0";
	$result = run_sql($query) or die();
	return $result;
}

function get_attrs($idBoard, $tokenName){
	$q = "SELECT attr,val FROM attrs WHERE idBoard=$idBoard AND tokenName='$tokenName'";
	$result = run_sql($q) or die();
	$arrAttrs = Array();
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$arrAttrs[$row['attr']] = $row['val'];
	}
	return $arrAttrs;
}

function get_attr($idBoard, $tokenName, $attrName){
	$q = "SELECT val FROM attrs WHERE idBoard=$idBoard AND tokenName='$tokenName' AND attr='$attrName'";
	$result = run_sql($q) or die();
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
	return $row['val'];
}

function get_attr2($token_id, $attrName){
	$token = get_token_by_id($token_id);
	$q = "SELECT val FROM attrs WHERE idBoard=".$token['idBoard']." AND tokenName='".$token['name']."' AND attr='$attrName'";
	$result = run_sql($q) or die();
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
	return $row['val'];
}

function get_guidelines($idBoard, $name){
	$query = "SELECT * FROM guidelines WHERE idBoard=$idBoard AND tokenName='$name'";
	$result = run_sql($query) or die();
	#$result = mysqli_query($db, $query);
	$arrGuidelines = Array();
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$arrGuidelines[$row['guideNumber']] = $row;
	}
	return $arrGuidelines;
}

function get_guideline($idBoard, $tokenName, $guideNumber){
	if ($guideNumber == 0){
		$guideNumber = get_default_guideline_id($idBoard, $tokenName);
	}
	$query = "SELECT * FROM guidelines WHERE idBoard=$idBoard AND tokenName='$tokenName' AND guideNumber=$guideNumber LIMIT 1";
	$result = run_sql($query) or die();
	return mysqli_fetch_array($result, MYSQLI_ASSOC);
}

function insert_board($board){
	global $db;
	$query = 'INSERT INTO boards (id, name, tilew, tileh, ntilesw, ntilesh, offsetx, offsety, bg, drawGrid, lastActionId, turn)';
	$query.= " VALUES (null, '$board->name', $board->tilew, $board->tileh, $board->ntilesw, $board->ntilesh, ";
	$query.= " $board->offsetx, $board->offsety, '$board->bg', $board->drawGrid, 0, 1) ";
	$result = run_sql($query) or die();
	return mysqli_insert_id($db);
}

function set_default_guideline_id($idBoard, $tokenName, $guide_id){
	$query = "UPDATE tokens SET defaultGuideline=$guide_id WHERE idBoard=$idBoard AND name='$tokenName'";
	$result = run_sql($query) or die();
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "UPDATE tokens SET actionId=$nextActionId WHERE idBoard=$idBoard";
    $query.= " AND name='$tokenName'";
	run_sql($query) or die();
	increase_last_actionId($idBoard, 1);
}

function get_default_guideline_id($idBoard, $tokenName){
	$query= "SELECT defaultGuideline FROM tokens WHERE idBoard=$idBoard AND name='$tokenName' LIMIT 1";
	$result = run_sql($query) or die();
	return (mysqli_fetch_array($result))[0];
}

function set_animation($idBoard, $tokenName, $step, $delay_after_step, $type_id, $src_x, $src_y, $target_x, $target_y){
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "DELETE FROM animations WHERE idBoard=$idBoard AND tokenName='$tokenName'";
	$result = run_sql($query) or die();
	$query = "INSERT INTO animations (idBoard, tokenName, step, delay_after_step, action_id, type_id, ";
	$query.= " src_x, src_y, target_x, target_y)";
	$query.= " VALUES ($idBoard, '$tokenName', $step, $delay_after_step, $nextActionId, $type_id, ";
	$query.= "$src_x, $src_y, $target_x, $target_y) ";
	$result = run_sql($query) or die();
	increase_last_actionId($idBoard, 1);
}

function insert_steps($idBoard, $tokenName, $type, $val){
	$q = "INSERT INTO steps (idBoard, tokenName, type, `max`, current) ";
	$q.= " VALUES ($idBoard, '$tokenName', '$type', $val, $val)";
	$q.= " ON DUPLICATE KEY UPDATE type='$type', max=$val, current=$val";
	run_sql($q) or die();
}

function set_token_opacity_by_name($idBoard, $tokenName, $opacity){
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "UPDATE tokens SET opacity=$opacity, actionId=$nextActionId WHERE idBoard=$idBoard AND name='$tokenName'";
	run_sql($query) or die();
	increase_last_actionId($idBoard, 1);
}

function new_turn($idBoard){
	$new_turn = get_turn($idBoard)+1;
	$q = "DELETE FROM mods WHERE idBoard = $idBoard AND last_turn<$new_turn;";
	run_sql($q) or die();
	$q = "UPDATE boards SET turn=turn+1 WHERE id=$idBoard";
	run_sql($q) or die();
	$q = "UPDATE steps SET current=max WHERE idBoard=$idBoard";
	error_log("Nuevo turno: ".$q);
	run_sql($q) or die();
}

function set_turn($idBoard, $turn){
	$q = "UPDATE boards SET turn=$turn WHERE id=$idBoard";
	run_sql($q) or die();
}

function get_turn($idBoard){
	$q = "SELECT turn FROM boards WHERE id=$idBoard";
	$result = run_sql($q) or die();
	$row = mysqli_fetch_row($result);
	return $row[0];
}

# Modify a step from data base
function mod_step($idBoard, $tokenName, $type, $val){
	$q = "UPDATE steps SET current=current+$val WHERE idBoard=$idBoard AND tokenName='$tokenName' AND type='$type'";
	run_sql($q) or die();
}

function set_step($idBoard, $tokenName, $type, $val){
	$q = "UPDATE steps SET current=$val WHERE idBoard=$idBoard AND tokenName='$tokenName' AND type='$type'";
	run_sql($q) or die();
}

function get_steps($idBoard, $tokenName){
	$q = "SELECT * FROM steps WHERE idBoard=$idBoard AND tokenName='$tokenName'";
	$result = run_sql($q) or die();
	return $result;
}

function get_step($idBoard, $tokenName, $type){
	$q = "SELECT * FROM steps WHERE idBoard=$idBoard AND tokenName='$tokenName' AND type='$type'";
	$result = run_sql($q) or die();
	return mysqli_fetch_array($result, MYSQLI_ASSOC);
}

function set_mod($idBoard, $tokenName, $attr, $status, $desc, $mod, $last_turn){
	$q = "INSERT INTO mods (idBoard, tokenName, attr, status, `desc`, `mod`, last_turn) ";
	$q.= " VALUES ($idBoard, '".$tokenName."', '$attr', '$status', '$desc', $mod, $last_turn)";
	run_sql($q) or die();
}

function get_mod($idBoard, $tokenName){
	$q = "SELECT * FROM mods WHERE idBoard=$idBoard AND tokenName='$tokenName'";
	$result = run_sql($q) or die();
	return $result;
}	

function get_mods_by_attr($idBoard, $tokenName, $attr){
	$q = "SELECT * FROM mods WHERE idBoard=$idBoard AND tokenName='$tokenName' AND attr='$attr'";
	$result = run_sql($q) or die();
	return $result;
}

function get_mods_by_attr_status($idBoard, $tokenName, $attr, $status){
	$q = "SELECT * FROM mods WHERE idBoard=$idBoard AND tokenName='$tokenName' AND attr='$attr' AND status='$status'";
	$result = run_sql($q) or die();
	return $result;
}

function get_mods_by_status($idBoard, $tokenName, $status){
	$q = "SELECT * FROM mods WHERE idBoard=$idBoard AND tokenName='$tokenName' AND status='$status'";
	$result = run_sql($q) or die();
	return $result;
}

function has_status($idBoard, $tokenName, $status){
	$ret = false;
	$q = "SELECT * FROM mods WHERE idBoard=$idBoard AND tokenName='$tokenName' AND status='$status' LIMIT 1";
	$rs = run_sql($q) or die();
	if ($rs->num_rows>0){
		$ret = true;
	}
	return $ret;
}

function remove_status($idBoard, $tokenName, $status){
	$q = "DELETE FROM mods WHERE idBoard=$idBoard AND tokenName='$tokenName' AND status='$status'";
	run_sql($q) or die();
}

/****************************** INVENTORY ********************/
function insert_inventory($token_id, $inv_name, $n, $position, $function){
	$q = "INSERT INTO inventory (token_id, name, n, position, function)";
	$q.= " VALUES ($token_id, '$inv_name', $n, $position, '$function') ";
	$q.= " ON DUPLICATE KEY UPDATE n=n+1";
	run_sql($q) or die();
}

function get_inventory_by_id($inventory_id){
	$q = "SELECT * FROM inventory WHERE inventory_id = $inventory_id";
	$rs = run_sql($q) or die();
	return mysqli_fetch_array($rs, MYSQLI_ASSOC);
}

function get_inventory_by_token_id($token_id){
	$q = "SELECT * FROM inventory WHERE token_id = $token_id";
	$rs = run_sql($q) or die();
	return $rs;
}

function get_inventory_by_tokenid_and_name($token_id, $inv_name){
	$q = "SELECT * FROM inventory WHERE token_id = $token_id AND name='$inv_name' LIMIT 1";
	$rs = run_sql($q) or die();
	return mysqli_fetch_array($rs, MYSQLI_ASSOC);
}

function inventory_remove_counter($token_id, $inv_name){
	$q = "UPDATE inventory SET n=n-1 WHERE token_id=$token_id AND name='$inv_name'";
	run_sql($q) or die();
}

/************************ GAME ***************************/
function get_game($game_id){
	$q = "SELECT * FROM games WHERE game_id=$game_id";
	$rs = run_sql($q) or die();
	return mysqli_fetch_array($rs, MYSQLI_ASSOC); 
}
?>
