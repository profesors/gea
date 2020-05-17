<?php

function setup_lang(){
	//putenv("LANGUAGE=es_ES");
	//putenv("LANG=es_ES");
	setlocale(LC_MESSAGES, 'es_ES.UTF-8');
	bindtextdomain('gea',dirname(__FILE__).'/../lang');
	bind_textdomain_codeset('gea', 'UTF-8');
	textdomain('gea');
}

# Roll one or more dices
function roll_dice_from_line($strDices, $extraMod=0){
	$strResults = '';
	$arrDices = explode(',', $strDices);
	$sDescription = '';
	$arrRet = Array();
	foreach($arrDices as $oneDice){
		preg_match("/(\d*)d(\d*)(([\+\-])(\d*))?/", $oneDice, $arrDice);
		$n = $arrDice[1];
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
		$natural = $result;
		$result += $mod;
		$strResults .= ' '.$result;
		$sMod = '';
		if ($mod>0) $sMod = '+'.$mod;
		if ($mod<0) $sMod = $mod;
		$sDescription= $n."d$size$sMod=<span class='red'>$result</span> ";
		$r = Array('n'=>$n, 'size'=>$size, 'mod'=>$mod, 'natural'=>$natural, 'result'=>$result, 'desc'=>$sDescription);
		array_push($arrRet, $r);
	}
	return $arrRet;
}

# Example getGuideActionByCode('r', $guideline): gets the range in guideline: r10,20,30
function getGuideActionByCode($code, $guideline){
	$ret = null;
	if(preg_match("/\s$code([^ ]*)/", $guideline, $arrTmp)){
		if (array_key_exists(1, $arrTmp)){
			$ret = $arrTmp[1];
		}
	}
	return $ret;
}

# Just return the funcion name of the guideline. The first code in the line
function getGuideActionFunction($guideline){
	$ret = null;
	if(preg_match("/^f([^ ]*)/", $guideline, $arrTmp)){
		if (array_key_exists(1, $arrTmp)){
			$ret = $arrTmp[1];
		}
	}
	return $ret;
}

function distance_tiles($x1, $y1, $x2, $y2){
	return sqrt(pow($x2-$x1,2)+pow($y2-$y1,2));
}

# Distance between tokens (arr token)
function distanceTokens($token1, $token2){
	$min_d = PHP_INT_MAX;
	$x1 = $y1 = $x2 = $y2 = -1;
	for ($a=0; $a<$token1['w'];$a++){
		for($b=0; $b<$token1['h'];$b++){
			for($c=0; $c<$token2['w']; $c++){
				for($d=0; $d<$token2['h']; $d++){
					$current_d = distance_tiles($token1['x']+$a, $token1['y']+$b, $token2['x']+$c, $token2['y']+$d);
					if ($current_d<$min_d){
						$min_d = $current_d;
						$x1 = $token1['x']+$a;
						$y1 = $token1['y']+$b;
						$x2 = $token2['x']+$c;
						$y2 = $token2['y']+$d;
					}
				}
			}
		}
	}
	return Array('d'=>$min_d, 'x1'=>$x1, 'y1'=>$y1, 'x2'=>$x2, 'y2'=>$y2);
}

# Get token and attrs
function get_token_and_attrs($idBoard, $tokenName){
	$token = get_token($idBoard, $tokenName);
	$token['attrs'] = get_attrs($idBoard, $token['name']);
	return $token;
}

# It gets a dice expression like '1d6' and returns structure
function split_dice($string_dice){
	#preg_match("/(\d)+d(\d)(([+-])(\d))*/", $string_dice, $arrDice);
	preg_match("/(\d+)d(\d+)/", $string_dice, $arrDice);
	return array('n'=>$arrDice[1], 'sides'=>$arrDice[2]);
}

# $n dices of $sides sides
function one_roll($n, $sides){
	$result = 0;
	for($i=0; $i<$n; $i++){
		$result+=rand(1,$sides);
	}
	return $result;
}

# Number of corners in a token (w x h = corners => 1x1=4, 2x2=9, 3x3=16)
function get_number_of_corners_in_token(&$token){
	return ($token['w']+1)*($token['h']+1);
}

function n_corners_visible(&$board, $im_bg_wall, $tilex1, $tiley1, $tilex2, $tiley2, $max=null){
	$n_visible = 0;
	for($a=0; $a<=1; $a++){		# Origin corner
		for ($b=0; $b<=1; $b++){
			$x1=$board->tilew*($tilex1-1+$a);
			$y1=$board->tileh*($tiley1-1+$b);
			for ($y=0; $y<=1; $y++){	# Destiny corner
				for ($x=0; $x<=1; $x++){
					$x2=$board->tilew*($tilex2-1+$x);
					$y2=$board->tileh*($tiley2-1+$y);
					$hidden_corners = 0;
					$v = isVisible_between_pixels($im_bg_wall, $x1, $y1, $x2, $y2);
					if ($v){
						$n_visible++;
					} 
					if ($n_visible==$max){
						return $n_visible;
					}
				}
			}
		}
	}
	return $n_visible;
}

# Returns min number of hidden corners
function min_hidden_corners_visible($im_bg_wall, &$token1, &$token2, &$board){
	$min_hidden_corners = PHP_INT_MAX;
	for($a=0; $a<=1; $a++){		# Origin corner
		for ($b=0; $b<=1; $b++){
			$x1=$board->tilew*($token1['x']-1+$a);
			$y1=$board->tileh*($token1['y']-1+$b);
			$hidden_corners = 0;
			for ($y=0; $y<=$token2['h']; $y++){	# Destiny corner
				for ($x=0; $x<=$token2['w']; $x++){
					$x2=$board->tilew*($token2['x']-1+$x);
					$y2=$board->tileh*($token2['y']-1+$y);
					$v = isVisible_between_pixels($im_bg_wall, $x1, $y1, $x2, $y2);
					if (!$v){
						$hidden_corners++;
					} 
					#echo "Origen($a,$b) Destino($x,$y) ".($v?'v':'nv')." HIDDEN CORNERS $hidden_corners\n";
					#echo "Origen($x1,$y1) Destino($x2,$y2) ".($v?'v':'nv')." HIDDEN CORNERS $hidden_corners\n";
					if ($hidden_corners > $min_hidden_corners)	break(2);
				}
			}
			$min_hidden_corners = ($hidden_corners < $min_hidden_corners)?$hidden_corners:$min_hidden_corners;
			if ($min_hidden_corners==0) return 0;
			#echo "\n";
		}
	}
	#echo "MIN $min_hidden_corners\n";
	return $min_hidden_corners;
}

function can_see_tokens($im_bg_wall, &$token1, &$token2, &$board){
	for($a=0; $a<=1; $a++){		# Origin corner
		for ($b=0; $b<=1; $b++){
			$x1=$board->tilew*($token1['x']-1+$a);
			$y1=$board->tileh*($token1['y']-1+$b);
			$hidden_corners = 0;
			for ($y=0; $y<=$token2['h']; $y++){	# Destiny corner
				for ($x=0; $x<=$token2['w']; $x++){
					$x2=$board->tilew*($token2['x']-1+$x);
					$y2=$board->tileh*($token2['y']-1+$y);
					$v = isVisible_between_pixels($im_bg_wall, $x1, $y1, $x2, $y2);
					if ($v) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

# Check if is visible from pixel to piexel
function isVisible_between_pixels($im, $x1, $y1, $x2, $y2){
	$visible = true;
	$d = sqrt(pow(($x2-$x1),2)+pow(($y2-$y1),2));
	if ($d>0){
		$dx = ($x2 - $x1)/$d;
		$dy = ($y2 - $y1)/$d;
		$t=0;
		while ($t<$d){
			$x = floor($x1+$t*$dx)-1;
			$y = floor($y1+$t*$dy)-1;
			$rgb = imagecolorat($im, $x, $y);
			#$r = ($rgb>>16) & 0xFF;
			$g = ($rgb>>8) & 0xFF;
			#$b = $rgb & 0xFF;
			if ($g==255)	{
				return false;
			}
			$t++;
		}
	}
	return $visible;
}

function free_from_enemy_in_tile($idBoard, &$token, $x, $y){
	$token2 = get_token_by_tile($idBoard, $x, $y);
	if ($token2!=null && $token['pc']!=$token2['pc']){
		return false;
	} 
	$rs_big_enemy = get_tokens_big_enemy($idBoard, $token['pc']);
	while ($tokenNpc = mysqli_fetch_array($rs_big_enemy, MYSQLI_ASSOC)){
		for ($a=0; $a<$tokenNpc['w']; $a++){
			for ($b=0; $b<$tokenNpc['h']; $b++){
				if ($x==$tokenNpc['x']+$a && $y==$tokenNpc['y']+$b) return false;
			}
		}
	}
	return true;
}

function isVisible_between_tiles(&$board, $im, $fromX1, $fromY1, $toX, $toY){
	$x1 = ($fromX1-1)*$board->tilew+$board->offsetx+0.5*$board->tilew;
	$y1 = ($fromY1-1)*$board->tileh+$board->offsety+0.5*$board->tileh;
	$x2 = ($toX-1)*$board->tilew+$board->offsetx+0.5*$board->tilew;
	$y2 = ($toY-1)*$board->tileh+$board->offsety+0.5*$board->tileh;
	$v = isVisible_between_pixels($im, $x1, $y1, $x2, $y2);
	return $v;
}
/*
function isVisible_between_tiles(&$board, $im, &$token, $toX, $toY){
	$x1 = ($token['x']-1)*$board->tilew+$board->offsetx+0.5*$board->tilew;
	$y1 = ($token['y']-1)*$board->tileh+$board->offsety+0.5*$board->tileh;
	$x2 = ($toX-1)*$board->tilew+$board->offsetx+0.5*$board->tilew;
	$y2 = ($toY-1)*$board->tileh+$board->offsety+0.5*$board->tileh;
	$v = isVisible_between_pixels($im, $x1, $y1, $x2, $y2);
	return $v;
}*/

function apply_lights(&$board, $im_walls, $im_full){
	$arr_lights = array($board->ntilesw,$board->ntilesh);
	$arr_lights2 = array($board->ntilesw,$board->ntilesh);
	for ($y=0; $y<=$board->ntilesh+1; $y++) 
		for($x=0; $x<=$board->ntilesw+1; $x++) {
			$arr_lights[$x][$y]=0;
			$arr_lights2[$x][$y]=0;
		}

	$black = imagecolorallocate($im_full, 0, 0, 0);
	# Generate sources of light
	$rs_lights = get_lights_by_board_id($board->id);
	$arr_sources = array();
	while($light = mysqli_fetch_array($rs_lights, MYSQLI_ASSOC)){
		array_push($arr_sources, $light);
	}
	$rs_pc = get_tokens_by_pc($board->id, 1);
	while ($pc = mysqli_fetch_array($rs_pc, MYSQLI_ASSOC)){
		$intensity = get_attr($board->id, $pc['name'], 'light');
		if ($intensity>=1){
			array_push($arr_sources, array('intensity'=>$intensity, 'tilex'=>$pc['x'], 'tiley'=>$pc['y']));
		}
	}
	mysqli_data_seek($rs_pc, 0);

	# Compute lights
	foreach($arr_sources as $light){
		//echo "LUZ ".$light['tilex']." ".$light['tiley']." I:".$light['intensity']." ID".$light['light_id'];
		$max_d = $light['intensity'];
		if ($light['intensity']==0) echo "ZERO ".$light['tilex']." ".$light['tiley']."\n";
		$pi2 = 3.14/2.0;
		$arrBlack = array();
		for($d=0; $d<=$max_d; $d++){
			$arrBlack[$d] = imagecolorallocatealpha($im_full, 0, 0, 0, 127*cos($pi2*(($d/$max_d))));
		}
		$x_min = max(1, $light['tilex']-$light['intensity']);
		$x_max = min($board->ntilesw, $light['tilex']+$light['intensity']);
		$y_min = max(1, $light['tiley']-$light['intensity']);
		$y_max = min($board->ntilesh, $light['tiley']+$light['intensity']);
		for ($y=$y_min; $y<=$y_max; $y++){
			for ($x=$x_min; $x<=$x_max; $x++){
				$d = floor(distance_tiles($light['tilex'], $light['tiley'], $x, $y));
				if ($d<=$max_d) {
					$n_corners = n_corners_visible($board,$im_walls, $light['tilex'],$light['tiley'],$x,$y,1);
				//if ($light['tilex']==9 && $light['tiley']==25 && $x==8 && $y==17) error_log("TEST ".$n_corners);
					if ($n_corners>=1){
						while($token=mysqli_fetch_array($rs_pc, MYSQLI_ASSOC)){
							//$v2 = isVisible_between_tiles($board, $im_walls, $token['x'], $token['y'], $x, $y);
							$n_corners = n_corners_visible($board,$im_walls, $token['x'],$token['y'],$x,$y,1);
							if ($n_corners>=1){
								$intensity = 127*cos($pi2*(($d/$max_d)));
								//$intensity = 127;
								$arr_lights[$x][$y] = min($arr_lights[$x][$y] + $intensity, 127);
								$arr_lights2[$x][$y] = $arr_lights[$x][$y];
							}
						}
						mysqli_data_seek($rs_pc, 0);
					}
				}
			}
		}
	}
	$dispersion =0.9;
	for ($y=1; $y<=$board->ntilesh; $y++){
		for ($x=1; $x<=$board->ntilesw; $x++){
			if ($arr_lights2[$x][$y]<64){
				$total = 0;
				$total += $arr_lights2[$x-1][$y-1]*$dispersion;
				$total += $arr_lights2[$x+1][$y-1]*$dispersion;
				$total += $arr_lights2[$x+1][$y+1]*$dispersion;
				$total += $arr_lights2[$x-1][$y+1]*$dispersion;
				$total += $arr_lights2[$x][$y-1];
				$total += $arr_lights2[$x][$y+1];
				$total += $arr_lights2[$x+1][$y];
				$total += $arr_lights2[$x-1][$y];
				$arr_lights[$x][$y] = min($arr_lights[$x][$y] + $total/8, 127);
				//if ($x==10 && $y==18) error_log("TEST ".$arr_lights[$x][$y]);
			}
		}
	}
	# Apply lights over .jpg
	for ($y=1; $y<=$board->ntilesh; $y++){
		for ($x=1; $x<=$board->ntilesw; $x++){
			$px = ($x-1)*70;
			$py = ($y-1)*70;
			$px2 = $x*70;
			$py2 = $y*70;
			$color = imagecolorallocatealpha($im_full, 0,0,0,$arr_lights[$x][$y]);
			imagefilledrectangle($im_full, $px, $py, $px2, $py2, $color);
		}
	}
	imagejpeg($im_full, '../img/bg/'.$board->bg.'.jpg', 90);

	# Show visible NPC
	$rsNpc = get_tokens_enemy($board->id,1);
	while($npc = mysqli_fetch_array($rsNpc, MYSQLI_ASSOC)){
		$intensity = $arr_lights[$npc['x']][$npc['y']];
		//if ($npc['name']=="Luca") error_log("LUCA");
		//error_log($npc['name']." I".$intensity);
		if ($intensity>32){
			//error_log("INTENSIDAD $intensity para ver a ".$npc['name']);
			//if (can_see_tokens($im_bg_wall, $token, $npc, $board)){
			set_token_opacity_by_name($board->id, $npc['name'], 1);
			//}
		} else {
			set_token_opacity_by_name($board->id, $npc['name'], 0);
		}
	}
}

function show_visible_npc($idBoard, $tokenName){
	$board = get_board($idBoard);
	$im_bg_wall = imagecreatefrompng("../img/bg/".$board->bg."_walls.png");
	$rsTokens = get_npc_hidden_tokens($idBoard);
	$tokenPc = get_token($idBoard, $tokenName);
	$arrTokens = array();
	while ($tokenNpc = mysqli_fetch_array($rsTokens, MYSQLI_ASSOC)){
		$d = distance_tiles($tokenPc['x'], $tokenPc['y'], $tokenNpc['x'], $tokenNpc['y']);
		//if ($d<=8){
			$v =can_see_tokens($im_bg_wall, $tokenPc, $tokenNpc, $board); 
			if ($v){
				set_token_opacity_by_name($idBoard, $tokenNpc['name'], 1);
			}
		//}
	}
}

function mb_ucfirst($str) {
    $fc = mb_strtoupper(mb_substr($str, 0, 1));
    return $fc.mb_substr($str, 1);
}

?>
