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
				$sum = 0;
				$arrM = explode(' ', $m);
				$sDice = $arrM[0];
				# Malus
				$arrD = explode('-', $sDice);
				if (count($arrD)>1) $sum = -$arrD[1];	// mod == modificatior, can be positive or negative
				# Dices
				$arrPositives = explode('+', ltrim($arrD[0], '#'));	// arrD == array dice
				foreach ($arrPositives as $arrPositive){	// Foreach thing to add: {dice, bonus}
					$arrItem = explode('d', $arrPositive);
					if (count($arrItem) > 0){	// It is a dice
						$n = $arrItem[0];
						$d = $arrItem[1];
						for($i=0; $i<$n; $i++){
							$sum += rand(1,$d);
						}
					} else {	// It is a bonus
						$sum += $arrItem[0];
					}
				}
				$action = "$sDice -> $sum";
				$name = ltrim($arrM[1], '@');
				echo "$action __ $name";
				set_dice($idBoard, $name, $sum);
				insert_action($idBoard, "$action @$name");
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
