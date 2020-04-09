<?php
include_once('sqlLib.php');

connectDB();

$idBoard = secure_param('idBoard');
$name = secure_param('name');
//$idBoard = 2;
//$name="1";
$query = "SELECT dice_result FROM actions WHERE idBoard = $idBoard AND name = '$name' LIMIT 1;";
$result = run_sql($query) or die();
if ($result->num_rows > 0){	// If this action exists in DB
	$row = mysqli_fetch_array($result);
	echo $row['dice_result']."\n";
} else {
	echo $idAction."\n"."!NO_EXISTS\n";
}
