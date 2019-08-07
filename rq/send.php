<?php	
	include_once('../lib.php');
	connectDB();

	//$_GET['m'] = "@1 B 3";
	//$_GET['idBoard'] = 2;
	$m = secure_param('m');
	$idBoard = secure_param('idBoard');
	if ($m != NULL){
		switch ($m[0]){
			case '@':	// If receive "@1 d 4"	it means Move @1 to cell D 4
				$arrM = explode(' ', $m);
				$name = mysqli_real_escape_string($db, $arrM[0]);
				$toX = ord(mb_strtoupper($arrM[1]))-ord('A')+1;
				$toY = $arrM[2];
				update_items($idBoard, $name, $toX, $toY);	// Update items table
				insert_action($idBoard, $m);			// Insert into action table
				break;
			case '_':
				$arrM = explode(' ', $m);
				$name = '@'.ltrim(mysqli_real_escape_string($db, $arrM[0]), '_');
				$x = ord(mb_strtoupper($arrM[1]))-ord('A')+1;
				$y = $arrM[2];
				$img_src = $arrM[3];
				insert_item($idBoard, 2, $x, $y, 1, 1, $img_src, $name);
				insert_action($idBoard, $m);
				break;
			case '#':	// If received "#1d6" generate a random number
				$mod = 0;
				echo "$m";
				$arrM = explode('+', ltrim($m, '#'));
				if (count($arrM)>1)	$mod = $arrM[1];
				$arrM = explode('-', $arrM[0]);
				if (count($arrM)>1) $mod = -$arrM[1];
				$arrM = explode('d', $arrM[0]);
				$n = $arrM[0];
				$d = $arrM[1];
				$sum = 0;
				for($i=0; $i<$n; $i++){
					$sum += rand(1,$d);
				}
				$sum += $mod;
				$action = "$m -> $sum";
				insert_action($idBoard, $action);
				break;
			default:
				insert_action($idBoard, $m);
		}
	} else {
		echo "Param m is NULL: $m";
	}
