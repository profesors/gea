<?php
function getTime(){
	$sRet = '<time>'.date('G:i').'</time>';
	return $sRet;
}

# Write down last action id in a raw file
function write_last_actionId($idBoard, $lastActionId){
	file_put_contents("../states/lastActionId-$idBoard.txt", $lastActionId);
}

# Inser action in the DB table
function insert_action($db, $m, $idBoard){
	$query = "INSERT INTO `actions` (`id`, `idUser`, `idBoard`, `ts`, `action`) VALUES (NULL, '1', '1',";
	$query.= " CURRENT_TIMESTAMP, '".utf8_decode(mysqli_real_escape_string($db, $m))."');";
	$result = mysqli_query($db, $query);
	if ($result == false) {
		echo "ERROR: Cannot insert into DB.actions: $query\n";
	} else {
		echo mysqli_insert_id($db)."\n".getTime()." $m";
		$lastActionId = mysqli_insert_id($db);
		write_last_actionId($idBoard, $lastActionId);
	}
}

# Update items table
function update_items($idBoard, $name, $x, $y){
	$query = "UPDATE items SET x=$x, y=$y WHERE idBoard = $idBoard AND name like '$name';";
	$result = mysqli_query($db, $query);
	if ($result == false){
		echo "ERROR: Cannot update position: $query";
	} else {
		echo mysqli_insert_id($db)."\n".getTime()." mv $name -> ".mb_strtoupper($arrM[1])." $toY";
	}

}
?>
