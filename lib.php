<?php

$db = null;

function connectDB(){
	global $db;
	$db = mysqli_connect("localhost", "gea", "gea", "Gea");
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
	$query.= " '$nextActionId', CURRENT_TIMESTAMP, '".utf8_decode(mysqli_real_escape_string($db, $m))."');";
	run_sql($query) or die();
	write_last_actionId($idBoard, $nextActionId);
}

# Update tokens table @TODO UPDATE colors and other columns
function update_token($idBoard, $name, $x, $y){
	global $db;
	$query = "UPDATE tokens SET x=$x, y=$y WHERE idBoard = $idBoard AND name = '$name';";
	$result = mysqli_query($db, $query);
	run_sql($query) or die();
}

function insert_token($idBoard, $name, $x, $y, $z, $step, $img_src, $border){
	global $db;
	$name = ($name=='')?'NULL':$name;
	$query = "INSERT INTO `tokens` (`idBoard`, `name`, `x`, `y`, `z`, `step`, `img`, `border`) ";
	$query.= " VALUES ('$idBoard', '$name', '$x', '$y', '$z', '$step', '$img_src', '$border') ";
	$query.= " ON DUPLICATE KEY UPDATE x=$x, y=$y";
	if ($img_src != ''){
		$query.= ", img='$img_src'";
	}
	if ($border != ''){
		$query.= ", border='$border'";
	}
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
}
?>
