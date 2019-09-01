<?php	
	include_once('../lib.php');
	connectDB();

	//$_GET['m'] = ":reset";
	//$_GET['idBoard'] = 3;
	$m = preg_replace('/[ ]+/', ' ', secure_param('m'));
	$idBoard = intval(secure_param('idBoard'));

	if ($m == '' && $m != NULL && $idBoard <= 0) die("ERROR: Wrong parameters");
	$arrCommands = explode(';', $m);
	foreach($arrCommands as $kCommand => $command){
		$command = trim($command);
	
		preg_match("/@([^ ]*)/", $command, $arrTmp);
		$name = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
		preg_match("/(\d+),(\d+)/", $command, $arrTmp);
		$x = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
		$y = array_key_exists(2, $arrTmp)?$arrTmp[2]:'';
		preg_match("/!([^ ]*)/", $command, $arrTmp);
		$img_src = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
		preg_match("/_([^ ]*)/", $command, $arrTmp);
		$border = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
		preg_match("/:([^ ]*)/", $command, $arrTmp);
		$manual_command = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
		preg_match("/%([^ ]*)/", $command, $arrTmp);
		$size = array_key_exists(1, $arrTmp)?$arrTmp[1]:1;
		
		if ($manual_command != ''){
			switch ($manual_command){
			case 'reset':
				echo "RESET";
				reset_board($idBoard);
				break;
			}
		} else {
			insert_token($idBoard, $name, $x, $y, 1, 1, $img_src, $border, $size);
			insert_action($idBoard, $m);
		}

		/*
		switch ($command[0]){
			case '@':
				$arrParameter = explode(' ', $command);
				#$name = ltrim(mysqli_real_escape_string($db, $arrParameter[0]), '@');
				$name = mysqli_real_escape_string($db, mb_substr(ltrim($arrParameter[0],'@'), 0, 3));
				$x = $arrParameter[1];
				$y = $arrParameter[2];
				$img_src = (array_key_exists(3, $arrParameter))?$arrParameter[3]:'';
				$border = (array_key_exists(4, $arrParameter))?$arrParameter[4]:'';
				insert_token($idBoard, $name, $x, $y, 1, 1, $img_src, $border);
				insert_action($idBoard, $m);
				break;
			case '#':	// If received "#1d6" generate a random number
				$sum = 0;
				$arrParameter = explode(' ', $command);
				$sDice = $arrParameter[0];
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
				$name = ltrim($arrParameter[1], '@');
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
				insert_action($idBoard, $command);
		}
		 */
	}
