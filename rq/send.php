<?php	
	include_once('../lib.php');
	connectDB();
	#$_GET['m'] = "@bar #1d20+2";
	#$_GET['idBoard'] = 4;

	$m = preg_replace('/[ ]+/', ' ', secure_param('m'));
	$idBoard = intval(secure_param('idBoard'));

	if ($m == '' && $m != NULL && $idBoard <= 0) die("ERROR: Wrong parameters");
	$arrCommands = explode(';', $m);
	foreach($arrCommands as $kCommand => $command){
		$command = trim($command);
		$manual_command = '';
	
		# Name
		$name = null;
		if (preg_match("/@([^ ]*)/", $command, $arrTmp)){
			$name = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
		}

		# Position and size
		$x=null; $y=null; $w=1; $h=1;
		if (preg_match("/p(\d+),(\d+)(,(\d+))?(,(\d+))?/", $command, $arrTmp)){
			$x = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
			$y = array_key_exists(2, $arrTmp)?$arrTmp[2]:'';
			$w = array_key_exists(4, $arrTmp)?$arrTmp[4]:'1';
			$h = array_key_exists(6, $arrTmp)?$arrTmp[6]:'1';
		}

		# imagen.png
		preg_match("/!([^ ]*)/", $command, $arrTmp);
		$img_src = array_key_exists(1, $arrTmp)?$arrTmp[1]:null;

		# borde css
		preg_match("/_([^ ]*)/", $command, $arrTmp);
		$border = array_key_exists(1, $arrTmp)?$arrTmp[1]:null;

		# INSERCIÓN COMPLETA DE TOKEN
		if ($name!=null && $x!=null && $y!=null && $img_src!=null && $border!=null){
			insert_token($idBoard, $name, $x, $y, 1, $w, $h, $img_src, $border);
			insert_action($idBoard, $command);
		} else if ($name!=null && $x!=null && $y!=null){
			# MOVIMIENTO DE TOKEN
			move_token($idBoard, $name, $x, $y);
			insert_action($idBoard, $command);
		}

		# tiles
		preg_match("/t([^ ]*)/", $command, $arrTmp);
		$tiles = array_key_exists(1, $arrTmp)?$arrTmp[1]:null;

		# attr
		$arr_attr = Array();
		if (preg_match("/\[([^ ]*)\]/", $command, $arrTmp)){
			$attr = array_key_exists(1, $arrTmp)?$arrTmp[1]:'';
			$arr_attr_tmp = explode(',', $attr);
			foreach($arr_attr_tmp as $v){
				$arr_field = explode(':',$v);
				$arr_attr[$arr_field[0]] = $arr_field[1];	
			}
			foreach($arr_attr as $k => $v){
				insert_attr($idBoard, $name, $k, $v);
				insert_action($idBoard, $command);
			}
		}
		# Guidelines (directrices)
		# \(((\d+)\)([^ ]*))
		if(preg_match_all("/\(((\d+)\)([^ ]*))/", $command, $arrTmp)){
			for($i=0; $i<sizeof($arrTmp[2]); $i++){
				$n_guideline = $arrTmp[2][$i];	# Number
				$s_guideline = $arrTmp[3][$i];	# String
				insert_guideline($idBoard, $name, $n_guideline, $s_guideline);
				insert_action($idBoard, $command);
			}
		}

		# Dice command
		if(preg_match("/#([^ ]*)/", $command, $arrTmp)){
			echo $command."\n";
			$strResults = '';
			$manual_command = 'dice';
			$arrDices = explode(',', $arrTmp[1]);
			$sDescription = '';
			foreach($arrDices as $oneDice){
				preg_match("/(\d*)d(\d*)(([\+\-])(\d*))?/", $oneDice, $arrDice);
				$n = $arrDice[1];
				$size = $arrDice[2];
				$mod = 0;
				if (array_key_exists('4',$arrDice)){
					$mod = $arrDice[4]=='+'?$arrDice[5]:-($arrDice[5]);
				}
				print_r($arrDice);
				$result = 0;
				for ($i=0; $i<$n;$i++){
					$result += rand(1, $size);
				}
				$result += $mod;
				$strResults .= ' '.$result;
				$sDescription.= $n."d$size".($mod!="0"?$arrDice[4].$mod:"")."=<span class='red'>$result</span> ";
			}
			set_dice($idBoard, $name, $strResults, $tiles);
			insert_action($idBoard, "@$name $sDescription");
		}
		
		# Other command		
		if(preg_match("/:reset/", $command, $arrTmp)){
			//for($i=1;$i<=7;$i++){
			echo "RESET";
			reset_board($idBoard);
			//}
		}
	
	}
