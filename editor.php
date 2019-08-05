<?php
	$db = mysqli_connect("localhost", "gea", "gea", "Gea");
	$content_file = file_get_contents('dungeons/01.dat');
	$query = "DELETE FROM items WHERE idBoard = 1;";
	mysqli_query($db, $query);
	$arrRows = explode("\n", $content_file);
	$y = $x = 1;
	foreach($arrRows as $k => $sRow){
		if ($sRow != ''){
			$x=1;
			$arrItems = explode(' ', $sRow);
			foreach($arrItems as $item){
				$img_name2 = ($item == '1')?'blocks/Voxel/voxelTile_30.png':'blocks/Voxel/voxelTile_29.png';
				$img_name1 = ($item == '1')?'001stone.jpg':'004stone.jpg';
				$ran = rand(1, 3);
				$query = "INSERT INTO items (`id`, `idBoard`, `x`, `y`, `z`, `step`, `img`, `name`)";
				$query.= " VALUES (NULL, '1', '$x', '$y', '$item', '1', '$img_name1', NULL);";
				echo $query."\n";
				mysqli_query($db, $query);

				$query = "INSERT INTO items (`id`, `idBoard`, `x`, `y`, `z`, `step`, `img`, `name`)";
				$query.= " VALUES (NULL, '2', '$x', '$y', '$item', '1', '$img_name2', NULL);";
				echo $query."\n";
				mysqli_query($db, $query);
				$x++;
			}
			$y++;
		}
	}
	mysqli_close($db);
