<?php	
	include_once('libSql.php');
	include_once('libControllers.php');
	include_once('../systems/lmde/actions.php');
	include_once('../systems/lmde/guidelines.php');
	connectDB();
	setup_lang();
	//$_GET['m'] = "@Groonan cstr";
	#$_GET['m'] = "@bar p8,22,9,22,10,22,10,21";
	//$_GET['idBoard'] = 1;

	# Multiple spaces into just one
	$m = str_replace('%20',' ',secure_param('m'));
	$m = preg_replace('/[ ]+/', ' ', $m);
	$idBoard = intval(secure_param('idBoard'));

	if ($m == '' && $m != NULL && $idBoard <= 0) die("ERROR: Wrong parameters");
	#$m = trim(preg_replace('/\s+/', '', $m));
	$arrCommands = explode(';', $m);
	foreach($arrCommands as $kCommand => $command){
		error_log("SEND: ".$command);
		$command = trim($command);
		$manual_command = '';
	
		# Name
		$name = null;
		if (preg_match("/@([^ ]*)/", $command, $arrParams)){
			$name = array_key_exists(1, $arrParams)?$arrParams[1]:'';
		}

		# Position and size
		$x=null; $y=null; $w=1; $h=1;
		$arr_path = array();
		# Receive a Path
		if (preg_match("/\sp([^ ]+)/", $command, $arrParams)){
			$arrParams = explode(',', $arrParams[1]);
			for($i=0; $i<sizeof($arrParams); $i+=2){
				$x = $arrParams[$i];
				$y = $arrParams[$i+1];
				array_push($arr_path, array('x'=>$x, 'y'=>$y));
			}
		}

		# Check
		if (preg_match("/\sc([^ ]+)/", $command, $arrParams)){
			$token = get_token($idBoard, $name);
			$attr = explode(',',$arrParams[1]);
			lmde_check($idBoard, $token, $attr[0]);
		}


		/*
		# imagen.png
		preg_match("/!([^ ]*)/", $command, $arrParams);
		$img_src = array_key_exists(1, $arrParams)?$arrParams[1]:null;

		# borde css
		preg_match("/_([^ ]*)/", $command, $arrParams);
		$border = array_key_exists(1, $arrParams)?$arrParams[1]:null;
		 */
		# Animation
		preg_match("/\sa([^ ]*)/", $command, $arrParams);
		$animation = array_key_exists(1, $arrParams)?$arrParams[1]:null;
		if ($animation=='out'){
			$token = get_token($idBoard, $name);
			move_token($idBoard, $token, $arr_path[1]['x'], $arr_path[1]['y'], false);
			die();
		}

		# INSERCIÓN COMPLETA DE TOKEN
		//if ($name!=null && $x!=null && $y!=null && $img_src!=null && $border!=null){
			//insert_token($idBoard, $name, $x, $y, 1, $w, $h, $img_src, $border);
			#insert_action($idBoard, "$name p$x,$y,$w,$h !img_src _$border");
		//} else if ($name!=null && $x!=null && $y!=null){
			# SOLO MOVIMIENTO DE TOKEN
		if ($name!=null && $x!=null && $y!=null){
			$token = get_token($idBoard, $name);
			$board = get_board($idBoard);
			$im = imagecreatefrompng("../img/bg/".$board->bg."_walls.png");
			move_token_by_path($idBoard, $token, $arr_path, $im);
			if ($token['pc']==1){
				show_visible_npc($idBoard, $name);
			}
			insert_action($idBoard, "<span class='name_text'>$name</span> "._("MOVES TO")." $x,$y");
		}

		# tiles
		preg_match("/t([^ ]*)/", $command, $arrParams);
		$tiles = array_key_exists(1, $arrParams)?$arrParams[1]:null;

		# attr
/*
		$arr_attr = Array();
		if (preg_match("/\[([^ ]*)\]/", $command, $arrParams)){
			$attr = array_key_exists(1, $arrParams)?$arrParams[1]:'';
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
*/
		# Guidelines (directrices)
/*
		if(preg_match_all("/\(((\d+)\)([^,]*)([^ ]*))/", $command, $arrParams)){
			for($i=0; $i<sizeof($arrParams[2]); $i++){
				$g = new stdClass();
				$g->number = $arrParams[2][$i];	# Number
				$g->name = $arrParams[3][$i];	# @TODO Testear esto, especialmente $arrParams[3][$i]
				$g->action = $arrParams[4][$i];	# String

				set_guideline($idBoard, $name, $g);
				#insert_action($idBoard, "@$name ($guideNumber)$guideAction");
			}
		} 
*/

		# Set default guideline
		if(preg_match_all("/:g([^,]+),(\d+)/", $command, $arrParams)){
			$name = $arrParams[1][0];
			$guide_id = $arrParams[2][0];
			set_default_guideline_id($idBoard, $name, $guide_id);
		}

		# New turn
		if(preg_match_all("/:t(\d*)/", $command, $arrParams)){
			$turn = $arrParams[1][0];
			if ($turn==''){
				new_turn($idBoard);
			} else {
				set_turn($idBoard, $turn);
			}
		}


		# Dice command
		if(preg_match("/\s#([^ ]*)/", $command, $arrParams)){
			$dice = roll_dice_from_line($arrParams[1]);
			$sDescription = $dice[0]['n'].'d'.$dice[0]['size'];
			$sDescription.= $dice[0]['mod']!=0?$dice[0]['mod']:'';
			$sDescription.= '=<span class="red">'.$dice[0]['result'].'</span> ';
			if (array_key_exists('1', $dice)){
				$sDescription.= $dice[1]['n'].'d'.$dice[1]['size'];
				$sDescription.= $dice[1]['mod']!=0?$dice[1]['mod']:'';
				$sDescription.= '<span class="red">'.$dice[1]['result'].'</span>';
			}
			$sDesc = '';
			$diceResult = '';
			for ($i=0; $i<sizeof($dice);$i++){
				$sDesc.= ' '.trim($dice[$i]['desc']);
				$diceResult .= $dice[$i]['result'];
			}
			//set_dice($idBoard, $name, $diceResult);
			set_output($idBoard, $name, $diceResult);
			insert_action($idBoard, "$name ".trim($sDesc));
		}
	
		# Remove token
		if (preg_match("/\sx(\d)*/", $command, $arrParams)){
			echo "Remove Token $name from $command";
			remove_token($idBoard, $name);
		}

		# Other command		
		if(preg_match("/:reset/", $command, $arrParams)){
			//for($i=1;$i<=7;$i++){
			echo "RESET";
			reset_board($idBoard);
			//}
		}
	
	}

