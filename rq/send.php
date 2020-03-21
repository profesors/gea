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
	
		if (preg_match("/@([^ ]*)/", $command, $arrTmp)){
			$name = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
			preg_match("/(\d+),(\d+)(,(\d+))?(,(\d+))?/", $command, $arrTmp);
			$x = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
			$y = array_key_exists(2, $arrTmp)?$arrTmp[2]:'';
			$w = array_key_exists(4, $arrTmp)?$arrTmp[4]:'1';
			$h = array_key_exists(6, $arrTmp)?$arrTmp[6]:'1';
		}

		# imagen.png
		preg_match("/!([^ ]*)/", $command, $arrTmp);
		$img_src = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';

		# borde css
		preg_match("/_([^ ]*)/", $command, $arrTmp);
		$border = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';

		# Dice command
		#if(preg_match("/#(\d*)d(\d*)(([\+\-])(\d*))?/", $command, $arrTmp)){
		if(preg_match("/#([^ ]*)/", $command, $arrTmp)){
			$strResults = '';
			$manual_command = 'dice';
			$arrDices = explode(',', $arrTmp[1]);
			foreach($arrDices as $oneDice){
				preg_match("/(\d*)d(\d*)(([\+\-])(\d*))?/", $oneDice, $arrDice);
				$n = $arrDice[1];
				$size = $arrDice[2];
				$mod = $arrDice[4]=='+'?$arrDice[5]:-($arrDice[5]);
				$result = 0;
				for ($i=0; $i<$n;$i++){
					$result += rand(1, $size);
				}
				$result += $mod;
				$strResults .= ' '.$result;
			}
			set_dice($idBoard, $name, $strResults);
			insert_action($idBoard, "$action @$name");
		}
		
		# Other command		
		if(preg_match("/:reset/", $command, $arrTmp)){
			$manual_command = 'reset';
		}
		#preg_match("/%([^ ]*)/", $command, $arrTmp);
		#$size = array_key_exists(1, $arrTmp)?$arrTmp[1]:1;
	
		if ($manual_command != ''){
			switch ($manual_command){
			case 'reset':
				echo "RESET";
				reset_board($idBoard);
				break;
			case 'dice':
				#set_dice($idBoard, $name, $dice['result']);
				#insert_action($idBoard, "$action @$name");
				break;
			}
		} else {
			insert_token($idBoard, $name, $x, $y, 1, $w, $h, $img_src, $border);
			insert_action($idBoard, $command);
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
