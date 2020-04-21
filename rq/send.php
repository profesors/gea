<?php	
	include_once('libSql.php');
	include_once('libControllers.php');
	connectDB();
	setup_lang();
	#$_GET['m'] = "@bar #1d20,1d10-2 to1";
	#$_GET['idBoard'] = 4;

	# Multiple spaces into just one
	$m = str_replace('%20',' ',secure_param('m'));
	$m = preg_replace('/[ ]+/', ' ', $m);
	$idBoard = intval(secure_param('idBoard'));

	if ($m == '' && $m != NULL && $idBoard <= 0) die("ERROR: Wrong parameters");
	#$m = trim(preg_replace('/\s+/', '', $m));
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

		# Animation
		preg_match("/\sa([^ ]*)/", $command, $arrTmp);
		$animation = array_key_exists(1, $arrTmp)?$arrTmp[1]:null;

		# INSERCIÓN COMPLETA DE TOKEN
		if ($name!=null && $x!=null && $y!=null && $img_src!=null && $border!=null){
			insert_token($idBoard, $name, $x, $y, 1, $w, $h, $img_src, $border);
			#insert_action($idBoard, "@$name p$x,$y,$w,$h !img_src _$border");
		} else if ($name!=null && $x!=null && $y!=null){
			# SOLO MOVIMIENTO DE TOKEN
			move_token($idBoard, $name, $x, $y);
			if ($animation != 'out'){
				insert_action($idBoard, "$name "._("MOVES TO")." $x,$y");
			}
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
				set_attr($idBoard, $name, $k, $v);
			}
			#insert_action($idBoard, "@$name [$attr]");
		}
		# Guidelines (directrices)
		if(preg_match_all("/\(((\d+)\)([^,]*)([^ ]*))/", $command, $arrTmp)){
			for($i=0; $i<sizeof($arrTmp[2]); $i++){
				$g = new stdClass();
				$g->number = $arrTmp[2][$i];	# Number
				$g->name = $arrTmp[3][$i];	# @TODO Testear esto, especialmente $arrTmp[3][$i]
				$g->action = $arrTmp[4][$i];	# String

				set_guideline($idBoard, $name, $g);
				#insert_action($idBoard, "@$name ($guideNumber)$guideAction");
			}
		} 
		# Dice command
		if(preg_match("/\s#([^ ]*)/", $command, $arrTmp)){
			$dice = roll_dice_from_line($arrTmp[1]);
			$sDescription = $dice[0]['n'].'d'.$dice[0]['size'];
			$sDescription.= $dice[0]['mod']!=0?$dice[0]['mod']:'';
			$sDescription.= '=<span class="red">'.$dice[0]['result'].'</span> ';
			if (array_key_exists('1', $dice)){
				$sDescription.= $dice[1]['n'].'d'.$dice[1]['size'];
				$sDescription.= $dice[1]['mod']!=0?$dice[1]['mod']:'';
				$sDescription.= '=<span class="red">'.$dice[1]['result'].'</span>';
			}
			$sDesc = '';
			$diceResult = '';
			for ($i=0; $i<sizeof($dice);$i++){
				$sDesc.= ' '.trim($dice[$i]['desc']);
				$diceResult .= $dice[$i]['result'];
			}
			set_dice($idBoard, $name, $diceResult);
			insert_action($idBoard, "@$name ".trim($sDesc));
		}
	
		# Remove token
		if (preg_match("/\sx(\d)*/", $command, $arrTmp)){
			echo "Remove Token $name from $command";
			remove_token($idBoard, $name);
		}

		# Other command		
		if(preg_match("/:reset/", $command, $arrTmp)){
			//for($i=1;$i<=7;$i++){
			echo "RESET";
			reset_board($idBoard);
			//}
		}
	
	}

