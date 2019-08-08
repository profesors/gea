<?php
include_once('../lib.php');
connectDB();
$idBoard = secure_param('idBoard');
//$idBoard = 2;

# Get tokens from board
$query = "SELECT * FROM tokens WHERE idBoard = $idBoard;";
$result = run_sql($query) or die();
while($row = mysqli_fetch_array($result)){
	echo $row['x'].' '.$row['y'].' '.$row['z'].' '.$row['step'].' '.$row['img'].' ';
	echo $row['name'].' '.$row['border']."\n";
}

