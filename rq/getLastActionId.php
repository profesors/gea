<?php
	$db = mysqli_connect("localhost", "gea", "gea", "Gea");
	$query = "SELECT id FROM actions WHERE idBoard = 1 ORDER BY id DESC LIMIT 1;";
	$result = mysqli_query($db, $query);
	if ($result != false){
		$row = mysqli_fetch_array($result);
		echo $row['id'];
	}
