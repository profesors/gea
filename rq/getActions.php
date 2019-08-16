<?php
	include_once('../lib.php');

	connectDB();

	$idBoard = secure_param('idBoard');
	//$idBoard = 1;
	$query = "SELECT * FROM actions WHERE idBoard = $idBoard AND idUser = 1 ORDER BY ts;";
	$result = run_sql($query) or die();
	while ($row = mysqli_fetch_array($result)){
		//echo $row['idAction']." ".$row['ts']." ".str_replace(' ', '+', $row['action'])."\n";
		echo '<p>'.date("H:i", strtotime($row['ts']))." ".$row['action']."</p>";
	} 
