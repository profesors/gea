<?php	
	include_once('../lib.php');
	connectDB();

	//$_GET['m'] = ":reset";
	//$_GET['idBoard'] = 2;
	$m = secure_param('m');
	$idBoard = secure_param('idBoard');

	if ($m != NULL){
		switch ($m[0]){
			case '@':
				$arrM = explode(' ', $m);
				$name = ltrim(mysqli_real_escape_string($db, $arrM[0]), '_');
				$x = ord(mb_strtoupper($arrM[1]))-ord('A')+1;
				$y = $arrM[2];
				$img_src = (array_key_exists(3, $arrM))?$arrM[3]:'';
				insert_token($idBoard, $name, $x, $y, 1, 1, $img_src);
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
			case ':':	// Command as :reset or :reload
				$command = ltrim($m, ':');
				switch ($command){
				case 'reset':
					reset_board($idBoard);
					break;
				}
				break;
			default:
				insert_action($idBoard, $m);
		}
	} else {
		echo "Param m is NULL: $m";
	}
