<?php
include_once('../lib.php');

connectDB();

$idAction = secure_param('idAction');
$idBoard = secure_param('idBoard');

# $idAction = 1;
# $idBoard = 4;

$query = "SELECT * FROM actions WHERE idAction=$idAction AND idBoard = $idBoard AND idUser = 1 LIMIT 1;";
$result = run_sql($query) or die();
if ($result->num_rows > 0){	// If this action exists in DB
	$row = mysqli_fetch_array($result);
	#echo $row['idAction']."\n".$row['ts']."\n".$row['action']."\n";
	$ret = new stdClass();
	$ret->idAction = $row['idAction'];
	$ret->ts = $row['ts'];
	$ret->action = $row['action'];
	echo json_encode($ret);
} 
