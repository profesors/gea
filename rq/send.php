<?php	
	include_once('sqlLib.php');
	connectDB();
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

		# INSERCIÓN COMPLETA DE TOKEN
		if ($name!=null && $x!=null && $y!=null && $img_src!=null && $border!=null){
			insert_token($idBoard, $name, $x, $y, 1, $w, $h, $img_src, $border);
			insert_action($idBoard, "@$name p$x,$y,$w,$h !img_src _$border");
		} else if ($name!=null && $x!=null && $y!=null){
			# MOVIMIENTO DE TOKEN
			move_token($idBoard, $name, $x, $y);
			insert_action($idBoard, "@$name p$x,$y");
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
			insert_action($idBoard, "@$name [$attr]");
		}
		# Guidelines (directrices)
		if(preg_match_all("/\(((\d+)\)([^ ]*))/", $command, $arrTmp)){
			for($i=0; $i<sizeof($arrTmp[2]); $i++){
				$nameGuideline = $arrTmp[2][$i];	# Number
				$guideline = $arrTmp[3][$i];	# String
				insert_guideline($idBoard, $name, $nameGuideline, $guideline);
				insert_action($idBoard, "@$name ($nameGuideline)$guideline");
			}
		} 
		# Dice command
		if(preg_match("/\s#([^ ]*)/", $command, $arrTmp)){
			$dice = roll_dice($arrTmp[1]);
			$sDescription = $dice[0]['n'].'d'.$dice[0]['size'];
			$sDescription.= $dice[0]['mod']!=0?$dice[0]['mod']:'';
			$sDescription.= '=<span class="red">'.$dice[0]['result'].'</span> ';
			if (array_key_exists('1', $dice)){
				$sDescription.= $dice[1]['n'].'d'.$dice[1]['size'];
				$sDescription.= $dice[1]['mod']!=0?$dice[1]['mod']:'';
				$sDescription.= '=<span class="red">'.$dice[1]['result'].'</span>';
			}
			# Fight against Target
			if (preg_match("/\st([^ ]+)/", $command, $arrTmp)){
				$token1 = get_token($idBoard, $name);
				$token2 = get_token($idBoard, $arrTmp[1]);
				$token1['attrs'] = get_attrs($idBoard, $token1['name']);
				$token2['attrs'] = get_attrs($idBoard, $token2['name']);
				$at = $dice[0]['result'];	# Result of first 1d20
				if (($at-$dice[0]['mod'])==20) {
					for($i=0; $i<$dice['1']['n']; $i++){
						$dice[1]['result'] += rand(1, $dice[1]['size']);
					}
					$dice[0]['desc'] = str_replace('</', '&#33;</', $dice[0]['desc']);
					$dice[1]['desc'] = str_replace('</', '&#33;</', $dice[1]['desc']);
				}
				$damage = $dice[1]['result'];
				$ac = $token2['attrs']['ac'];
				if ($at >= $ac){
					$token2['attrs']['hp']-=$damage;
					set_attr($idBoard, $token2['name'], 'hp', $token2['attrs']['hp']);
				}
			}
			$sDesc = '';
			for ($i=0; $i<sizeof($dice);$i++){
				$sDesc.= ' '.trim($dice[$i]['desc']);
			}
			set_dice($idBoard, $name, $dice[0]['result'].' '.$dice[1]['result'], $tiles);
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

function roll_dice($strDices,$extraMod=0, $bCrit=false){
	$strResults = '';
	$arrDices = explode(',', $strDices);
	$sDescription = '';
	$arrRet = Array();
	foreach($arrDices as $oneDice){
		preg_match("/(\d*)d(\d*)(([\+\-])(\d*))?/", $oneDice, $arrDice);
		$n = $bCrit?2*$arrDice[1]:$arrDice[1];
		$size = $arrDice[2];
		$mod = 0;
		if (array_key_exists('4',$arrDice)){
			$mod = $arrDice[4]=='+'?$arrDice[5]:-($arrDice[5]);
		}
		$mod+=$extraMod;
		$result = 0;
		for ($i=0; $i<$n;$i++){
			$result += rand(1, $size);
		}
		$result += $mod;
		$strResults .= ' '.$result;
		$sMod = '';
		if ($mod>0) $sMod = '+'.$mod;
		if ($mod<0) $sMod = $mod;
		$sDescription= $n."d$size$sMod=<span class='red'>$result</span> ";
		$r = Array('n'=>$n, 'size'=>$size, 'mod'=>$mod, 'result'=>$result, 'desc'=>$sDescription);
		array_push($arrRet, $r);
	}
	return $arrRet;
}
