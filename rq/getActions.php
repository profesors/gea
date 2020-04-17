<?php
include_once('libSql.php');

connectDB();

$idBoard = secure_param('idBoard');
$op = secure_param('op');
# $idBoard = 1;

$query = "SELECT * FROM actions WHERE idBoard = $idBoard AND idUser = 1 ORDER BY ts;";
$result = run_sql($query) or die();

while ($row = mysqli_fetch_array($result)){
	if (($op=='player' && strpos($row['action'],'!')) || strlen($row['action'])==0){
		// No mostrar al jugador esta acción	
	} else {
		echo '<po>'.date("H:i", strtotime($row['ts']))." ".$row['action']."</p>";
	}
} 
