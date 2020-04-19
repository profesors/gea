<?php
include_once('libSql.php');
include_once('libControllers.php');

connectDB();
setup_lang();

$idBoard = secure_param('idBoard');
$op = secure_param('op');
# $idBoard = 1;

$query = "SELECT * FROM (SELECT * FROM actions WHERE idBoard = $idBoard ";
$query.= 'AND idUser = 1 ORDER BY ts DESC LIMIT 20) AS var ORDER BY ts ASC';
$result = run_sql($query) or die();

while ($row = mysqli_fetch_array($result)){
	if (($op=='player' && strpos($row['action'],'!')) || strlen($row['action'])==0){
		// No mostrar al jugador esta acción	
	} else {
		echo '<p>'.date("H:i", strtotime($row['ts']))." ".utf8_encode($row['action'])."</p>";
	}
} 
