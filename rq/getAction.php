<?php
	$db = mysqli_connect("localhost", "gea", "gea", "Gea");
	//$_GET['id'] = 1;
	$id = (array_key_exists('id', $_GET))?mysqli_real_escape_string($db, $_GET['id']):NULL;
	if ($id != NULL) {
		$query = "SELECT * FROM actions WHERE id=$id AND idBoard = 1;";
		$result = mysqli_query($db, $query);
		if ($result != false){
			$row = mysqli_fetch_array($result);
			echo $row['id']."\n".$row['ts']."\n".$row['action'];
		}
	}
