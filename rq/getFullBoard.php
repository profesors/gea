<?php
	$db = mysqli_connect("localhost", "gea", "gea", "Gea");
	$query = "SELECT x, y, z, step, img, name FROM items WHERE idBoard = 1;";
	$result = mysqli_query($db, $query);
	while($row = mysqli_fetch_array($result)){
		echo $row['x'].' '.$row['y'].' '.$row['z'].' '.$row['step'].' '.$row['img'].' '.$row['name']."\n";
	}

