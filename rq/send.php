<?php	
	include_once('../lib.php');
	connectDB();

	//$_GET['m'] = "@1, 10,  10";
	//$_GET['idBoard'] = 2;
	$m = preg_replace('/[ ,]+/', ' ', secure_param('m'));
	$idBoard = intval(secure_param('idBoard'));

	if ($m == '' && $idBoard <= 0) die("ERROR: Wrong parameters");

	if ($m != NULL){
		switch ($m[0]){
			case '@':
				$arrM = explode(' ', $m);
				#$name = ltrim(mysqli_real_escape_string($db, $arrM[0]), '@');
				$name = mysqli_real_escape_string($db, mb_substr(ltrim($arrM[0],'@'), 0, 3));
				$x = $arrM[1];
				$y = $arrM[2];
				$img_src = (array_key_exists(3, $arrM))?$arrM[3]:'';
				$border = (array_key_exists(4, $arrM))?$arrM[4]:'';
				insert_token($idBoard, $name, $x, $y, 1, 1, $img_src, $border);
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
