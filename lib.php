<?php

# 1.1
$db = null;
const DIR_BASE = '/home/samuel/Web/Gea';
const DIR_BG = DIR_BASE.'/img/bg';

function connectDB(){
	global $db;
	// Host, user, passwd, db_name
	$db = mysqli_connect("localhost", "gea", "gea", "gea");
	//$db = mysqli_connect("db5000148109.hosting-data.io:3306", "dbu120009", "S4!4m4nc4", "dbs143332");
	if (!$db){
		echo "ERROR: Cannot connect to DB\n";
		die();
	}
}

function secure_param($name){
	return (array_key_exists($name, $_GET))?$_GET[$name]:NULL;
}

function run_sql($query){
	global $db;
	$result = mysqli_query($db, $query);
	if ($result == false){
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

# Write down last action id in a raw file
function write_last_actionId($idBoard, $actionId){
	global $db;
	$query = "UPDATE boards SET lastActionId=$actionId WHERE id=$idBoard;";
	run_sql($query) or die();
}

function increase_last_actionId($idBoard, $ammount){
	global $db;
	$query = "UPDATE boards SET lastActionId = lastActionId + $ammount;";
	run_sql($query) or die();
}
function read_last_actionId($idBoard){
	global $db;
	$query = "SELECT lastActionId FROM boards WHERE id=$idBoard LIMIT 1;";
	$lastId = 0;
	$result = mysqli_query($db, $query) or die();
	if ($result->num_rows > 0){
		$arr = mysqli_fetch_array($result);
		$lastId = $arr['lastActionId'];
	}
	return $lastId;
}

# Inser action in the DB table
function insert_action($idBoard, $m){
	global $db;
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "INSERT INTO `actions` (`idUser`, `idBoard`, `idAction`, `ts`, `action`) VALUES ('1', '$idBoard',";
	$query.= " $nextActionId, CURRENT_TIMESTAMP, '".utf8_decode(mysqli_real_escape_string($db, $m))."');";
	run_sql($query) or die();
	write_last_actionId($idBoard, $nextActionId);
}

function insert_guideline($idBoard, $name, $n_guideline, $s_guideline){
	global $db;
	$query = "INSERT INTO `guidelines` (idBoard, name, number, guideline) ";
	$query.= "VALUES ($idBoard, '$name', $n_guideline, '$s_guideline') ";
	$query.= " ON DUPLICATE KEY UPDATE guideline='$s_guideline'";
	run_sql($query) or die();
}

# Update token position X, Y, Z
function update_position_token($idBoard, $name, $x, $y, $z){
	global $db;
	$query = "UPDATE tokens SET x=$x, y=$y, z=1 WHERE idBoard = $idBoard AND name = '$name';";
	$result = mysqli_query($db, $query);
	run_sql($query) or die();
}

# Insert token in database, if there is not $img_src or $border ignore it
# If the token id is duplicate, just update it
function insert_token($idBoard, $name, $x, $y, $z, $w, $h, $img_src, $border){
	global $db;
	$name = ($name=='')?'NULL':$name;
	$query = "INSERT INTO `tokens` (`idBoard`, `name`, `x`, `y`, `z`, `w`, `h`, `step`, `img`, `border`, `dice_result`) ";
	$query.= " VALUES ('$idBoard', '$name', $x, $y, $z, $w, $h, 1, ";
	$query.= "'$img_src', '$border', NULL) ";
	$query.= " ON DUPLICATE KEY UPDATE x=$x, y=$y";
	if ($img_src != ''){
		$query.= ", img='$img_src'";
	}
	if ($border != ''){
		$query.= ", border='$border'";
	}
	run_sql($query) or die();
}

function move_token($idBoard, $name, $x, $y){
	global $db;
	$name = ($name=='')?'NULL':$name;
	$query = "UPDATE `tokens` SET x=$x, y=$y WHERE idBoard=$idBoard AND name='$name'";
	run_sql($query) or die();
}

function insert_attr($idBoard, $name, $attr, $val){
	global $db;
	$query = "INSERT INTO attrs (idBoard, tokenName, attr, val) ";
	$query.= "VALUES ($idBoard,'$name','$attr',$val) ";
	$query.= " ON DUPLICATE KEY UPDATE val='$val'";
	run_sql($query) or die();
}

function reset_board($idBoard){
	global $db;
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

# Updates the dice column of a token
function set_dice($idBoard, $name, $value, $tiles){
	global $db;
	$query = "SELECT lastActionId FROM boards WHERE id = $idBoard LIMIT 1;";
	$result = run_sql($query) or die();
	$row = mysqli_fetch_array($result);
	$nextActionId = $row['lastActionId']+1;	# current last action + 1 because it will be increased
	$dice_action = trim("$nextActionId,$tiles",',');
	$query = "UPDATE tokens SET dice_result = '$value', dice_action = '$dice_action' WHERE idBoard = $idBoard AND name = '$name';";
	run_sql($query) or die();
}


function get_bg_filename($idBoard){
	global $db;
	$query = "SELECT bg FROM boards WHERE id = $idBoard LIMIT 1;";
	$result = run_sql($query) or die();
	$row = mysqli_fetch_array($result);
	$bg_name = $row['bg'];
	return $bg_name;
}

function get_bg_ts($idBoard){
	global $db;
	$bg_file_name = get_bg_filename($idBoard);
	$bg_ts = filemtime(DIR_BG.'/'.$bg_file_name);
	return $bg_ts;
}


?>
