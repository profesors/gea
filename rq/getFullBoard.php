<?php
include_once('../lib.php');
connectDB();
$idBoard = secure_param('idBoard');
//$idBoard = 2;

# Get Board
$query = "SELECT * FROM boards WHERE id = $idBoard LIMIT 1;";
$result = mysqli_query($db, $query);
if ($result == false){
	error_mysqli($query);
} else {
	$row = mysqli_fetch_array($result);
	echo $row['id']."\n";
	echo $row['name']."\n".$row['tilew']."\n".$row['tileh']."\n";
	echo $row['ntilesw']."\n".$row['ntilesh']."\n";
	echo $row['bg']."\n".$row['drawGrid']."\n".$row['lastActionId']."\n";
}

# Get Items in board
$query = "SELECT * FROM items WHERE idBoard = $idBoard;";
$result = mysqli_query($db, $query);
if ($result == false){
	error_mysqli($query);
} else {
	while($row = mysqli_fetch_array($result)){
		echo $row['x'].' '.$row['y'].' '.$row['z'].' '.$row['step'].' '.$row['img'].' '.$row['name'].' '.$row['idType']."\n";
	}
}

