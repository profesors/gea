<?php

$db = null;

function connectDB(){
	global $db;
	$db = mysqli_connect("localhost", "gea", "gea", "Gea");
}

function secure_param($name){
	return (array_key_exists($name, $_GET))?$_GET[$name]:NULL;
}

function error_mysqli($query){
	global $db;
    echo "ERROR ".mysqli_errno($db).': '.mysqli_error($db).' with query: '.$query;
	die();
}

function getTime(){
	$sRet = '<time>'.date('G:i').'</time>';
	return $sRet;
}

# Write down last action id in a raw file
function write_last_actionId($idBoard, $actionId){
	global $db;
	$query = "UPDATE boards SET lastActionId=$actionId WHERE id=$idBoard;";
	$result = mysqli_query($db, $query);
	if ($result == false){
		error_mysqli($query);
	} else {
		
	}
}

function read_last_actionId($idBoard){
	global $db;
	$query = "SELECT lastActionId FROM boards WHERE id=$idBoard LIMIT 1;";
	$result = mysqli_query($db, $query);
	$lastId = 0;
	if ($result == false){
		error_mysqli($query);
	} else{
		if ($result->num_rows > 0){
			$arr = mysqli_fetch_array($result);
			$lastId = $arr['lastActionId'];
		}
	}
	return $lastId;
}

# Inser action in the DB table
function insert_action($idBoard, $m){
	global $db;
	$nextActionId = intval(read_last_actionId($idBoard))+1;
	$query = "INSERT INTO `actions` (`idUser`, `idBoard`, `idAction`, `ts`, `action`) VALUES ('1', '$idBoard',";
	$query.= " '$nextActionId', CURRENT_TIMESTAMP, '".utf8_decode(mysqli_real_escape_string($db, $m))."');";
	$result = mysqli_query($db, $query);
	if ($result == false) {
		error_mysqli($query);
	} else {
		echo $nextActionId."\n".getTime()." $m\n";
		write_last_actionId($idBoard, $nextActionId);
	}
}

# Update items table
function update_items($idBoard, $name, $x, $y){
	global $db;
	$query = "UPDATE items SET x=$x, y=$y WHERE idBoard = $idBoard AND name = '$name';";
	$result = mysqli_query($db, $query);
	if ($result == false){
		error_mysqli($query);
	} else {
		//echo mysqli_insert_id($db)."\n".getTime()."$name $x $y";
	}
}

function insert_item($idBoard, $idType, $x, $y, $z, $step, $img_src, $name){
	global $db;
	$name = ($name=='')?'NULL':$name;
	$query = "INSERT INTO `items` (`id`, `idBoard`, `idType`, `x`, `y`, `z`, `step`, `img`, `name`) VALUES (NULL, '$idBoard', '$idType', '$x', '$y', '$z', '$step', '$img_src', '$name');";
	$result = mysqli_query($db, $query);
	if ($result == false){
		error_mysql($query);	
	} else {
		echo mysqli_insert_id($db)."\n".getTime()." $name $x $y $img_src\n";
	}
}
?>
