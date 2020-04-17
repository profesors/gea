<?php
# Roll one or more dices
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

?>
