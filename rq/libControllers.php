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

function mb_ucfirst($str) {
    $fc = mb_strtoupper(mb_substr($str, 0, 1));
    return $fc.mb_substr($str, 1);
}
?>
