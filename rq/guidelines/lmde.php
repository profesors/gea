<?php

# Fight agains target in close combat
function lmde_attack($idBoard, $tokenName1, $tokenName2, $guideNumber){
	$token1 = get_token($idBoard, $tokenName1);
	$token2 = get_token($idBoard, $tokenName2);
	$token1['attrs'] = get_attrs($idBoard, $token1['name']);
	$token2['attrs'] = get_attrs($idBoard, $token2['name']);
	$g =  get_guideline($idBoard, $tokenName1, $guideNumber);	# g = Guideline
	$g['range'] = getGuideActionByCode('r', $g['guideAction']);	# Range
	$g['attack'] = getGuideActionByCode('a', $g['guideAction']);	# Range
	$g['damage'] = getGuideActionByCode('d', $g['guideAction']);	# Range
	$dice = roll_dice($g['attack'].','.$g['damage']);
	print_r($dice);
	$arrDist = distanceTokens($token1, $token2);
	if (floor($arrDist['d'])<=1){
		$at = $dice[0]['result'];	# Result of first 1d20
		echo "AT: $at\n";
		if (($at-$dice[0]['mod'])==20) {
			for($i=0; $i<$dice['1']['n']; $i++){
				$dice[1]['result'] += rand(1, $dice[1]['size']);
			}
			$dice[0]['desc'] = str_replace('</', '&#33;</', $dice[0]['desc']);
			$dice[1]['desc'] = str_replace('</', '&#33;</', $dice[1]['desc']);
		}
		$damage = $dice[1]['result'];
		$ac = $token2['attrs']['ac'];
		echo "AC:$ac\n";
		if ($at >= $ac){
			$token2['attrs']['hp']-=$damage;
			set_attr($idBoard, $token2['name'], 'hp', $token2['attrs']['hp']);
		}
		set_dice($idBoard, $token1['name'], $dice[0]['result'].' '.$dice[1]['result'], $token2['name']);
		//insert_action($idBoard, '@'.$token1['name'].' '.'Dado');
	}
}

# Fight agains target in ranged combat
function lmde_rangedAttack($idBoard, $tokenName1, $tokenName2, $guideNumber){
	$token1 = get_token($idBoard, $tokenName1);
	$token2 = get_token($idBoard, $tokenName2);
	$token1['attrs'] = get_attrs($idBoard, $token1['name']);
	$token2['attrs'] = get_attrs($idBoard, $token2['name']);
	$g =  get_guideline($idBoard, $tokenName1, $guideNumber);	# g = Guideline
	$g['range'] = getGuideActionByCode('r', $g['guideAction']);	# Range
	$g['range'] = explode(',', $g['range']);
	$g['attack'] = getGuideActionByCode('a', $g['guideAction']);	# Range
	$g['damage'] = getGuideActionByCode('d', $g['guideAction']);	# Range
	$dice = roll_dice($g['attack'].','.$g['damage']);
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
	set_dice($idBoard, $token1['name'], $dice[0]['result'].' '.$dice[1]['result'], $token2['name']);
	insert_action($idBoard, '@'.$token1['name'].' '.'Dado');
}
