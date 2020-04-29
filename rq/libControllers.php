<?php

function setup_lang(){
	setlocale(LC_MESSAGES, 'es_ES.UTF-8');
	bindtextdomain('gea',dirname(__FILE__).'/../lang');
	textdomain('gea');
}

/*
function roll_dice($str_dice){
	$arr_dice = split_dice($str_dice);
}
 */

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

function distanceTiles($x1, $y1, $x2, $y2){
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
					$current_d = distanceTiles($token1['x']+$a, $token1['y']+$b, $token2['x']+$c, $token2['y']+$d);
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

# Returns min number of hidden corners
function min_hidden_corners_visible($im_bg_wall, &$token1, &$token2, &$board){
	//global $img_bg_wall;
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
	$tokenInCell = get_token_by_tile($idBoard, $x, $y);
	$ret = true;
	if ($tokenInCell!=null && $tokenInCell['pc']!=$token['pc']){
		$ret = false;
	}
	return $ret;
}

function isVisible_between_tiles(&$board, $im, &$token, $toX, $toY){
	$x1 = ($token['x']-1)*$board->tilew+$board->offsetx+0.5*$board->tilew;
	$y1 = ($token['y']-1)*$board->tileh+$board->offsety+0.5*$board->tileh;
	$x2 = ($toX-1)*$board->tilew+$board->offsetx+0.5*$board->tilew;
	$y2 = ($toY-1)*$board->tileh+$board->offsety+0.5*$board->tileh;
	$v = isVisible_between_pixels($im, $x1, $y1, $x2, $y2);
	return $v;
}

function show_visible_npc($idBoard, $tokenName){
	$im_bg_wall = imagecreatefrompng("../img/bg/010bg_walls.png");
	$board = get_board($idBoard);
	$rsTokens = get_npc_hidden_tokens($idBoard);
	$tokenPc = get_token($idBoard, $tokenName);
	$arrTokens = array();
	while ($tokenNpc = mysqli_fetch_array($rsTokens, MYSQLI_ASSOC)){
		$v =can_see_tokens($im_bg_wall, $tokenPc, $tokenNpc, $board); 
		if ($v){
			set_token_opacity_by_name($idBoard, $tokenNpc['name'], 1);
		}
	}
}

function mb_ucfirst($str) {
    $fc = mb_strtoupper(mb_substr($str, 0, 1));
    return $fc.mb_substr($str, 1);
}

?>
