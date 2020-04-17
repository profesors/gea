<?php

# Fight agains target in close combat
function lmde_attack($idBoard, $tokenName1, $tokenName2, $guideNumber){
	$token1 = get_token($idBoard, $tokenName1);
	$token2 = get_token($idBoard, $tokenName2);
	$token1['attrs'] = get_attrs($idBoard, $token1['name']);
	$token2['attrs'] = get_attrs($idBoard, $token2['name']);
	$guidelineAction =  get_guideline($idBoard, $tokenName1, $guideNumber);	# g = Guideline
	$guidelineAction['range'] = getGuideActionByCode('r', $guidelineAction['guideAction']);	# Range
	$guidelineAction['attack'] = getGuideActionByCode('a', $guidelineAction['guideAction']);	# Range
	$guidelineAction['damage'] = getGuideActionByCode('d', $guidelineAction['guideAction']);	# Range
	$dice = roll_dice($guidelineAction['attack'].','.$guidelineAction['damage']);
	$arrDist = distanceTokens($token1, $token2);
	if (floor($arrDist['d'])<=1){
		$critic = false;
		$at = $dice[0]['result'];	# Just to test if it is a critic
		if (($at-$dice[0]['mod'])==20) {	# If it is a natural 20
			for($i=0; $i<$dice['1']['n']; $i++){
				$dice[1]['result'] += rand(1, $dice[1]['size']);
			}
			$dice[1]['n']*=2;
			$critic = true;
		}							# End of critic
		$damage = $dice[1]['result'];
		$ac = $token2['attrs']['ac'];
		$hit = false;
		if ($at >= $ac){
			$hit = true;
			$token2['attrs']['hp']-=$damage;
			set_attr($idBoard, $token2['name'], 'hp', $token2['attrs']['hp']);
		}
		set_dice($idBoard, $token1['name'], $dice[0]['result'].' '.$dice[1]['result'], $token2['name']);
		$action_string = $token1['name'].' attacks to '.$token2['name'];
		$action_string.= ' At:<span class="red">'.$at.'</span>=1d'.$dice[0]['size'].'+'.$dice[0]['mod'];
		if ($hit) {
			$action_string.= ' Dmg:<span class="red">'.$damage.'</span>='.$dice[1]['n'].'d'.$dice[1]['size'];
			$action_string.= $dice[1]['mod']>0?'+'.$dice[1]['mod']:'';
			$action_string.= $dice[1]['mod']<0?'-'.$dice[1]['mod']:'';
			$action_string.= $critic?' <span class="red">CRITICAL HIT</span>':'';
		} else {
			$action_string.= ' <span class="red">FAIL</span>';
		}
		insert_action($idBoard, $action_string);
	}
}

# Fight agains target in ranged combat
function lmde_rangedAttack($idBoard, $tokenName1, $tokenName2, $guideNumber){
	$token1 = get_token($idBoard, $tokenName1);
	$token2 = get_token($idBoard, $tokenName2);
	$token1['attrs'] = get_attrs($idBoard, $token1['name']);
	$token2['attrs'] = get_attrs($idBoard, $token2['name']);
	$guidelineAction =  get_guideline($idBoard, $tokenName1, $guideNumber);	# g = Guideline
	$guidelineAction['range'] = getGuideActionByCode('r', $guidelineAction['guideAction']);	# Range
	$guidelineAction['range'] = explode(',', $guidelineAction['range']);
	$guidelineAction['attack'] = getGuideActionByCode('a', $guidelineAction['guideAction']);	# Range
	$guidelineAction['damage'] = getGuideActionByCode('d', $guidelineAction['guideAction']);	# Range
	$dice = roll_dice($guidelineAction['attack'].','.$guidelineAction['damage']);
	$arrDist = distanceTokens($token1, $token2);
	$distance_mod = 0;
	if ($arrDist['d']<=$guidelineAction['range'][2])	$distance_mod=-1;
	if ($arrDist['d']<=$guidelineAction['range'][1])	$distance_mod=0;
	if ($arrDist['d']<=$guidelineAction['range'][0])	$distance_mod=1;
	$action_string;
	$guideline_n = guideline_get_n($idBoard, $token1['name'], 2);
	if ($guideline_n!=0){	# >0 proyectiles; or -1 for infinite
		if ($arrDist['d']>1 && floor($arrDist['d']) <= $guidelineAction['range'][2]){
			$at = $dice[0]['result'];	# Just to test if it is a critic
			$critic = false;
			if (($at-$dice[0]['mod'])==20) {	# If it is a natural 20
				for($i=0; $i<$dice['1']['n']; $i++){
					$dice[1]['result'] += rand(1, $dice[1]['size']);
				}
				$dice[1]['n']*=2;
				$critic = true;
			}							# End of critic
			$damage = $dice[1]['result'];
			$ac = $token2['attrs']['ac'];
			$hit = false;
			if ($at+$distance_mod >= $ac){
				$hit = true;
				$token2['attrs']['hp']-=$damage;
				set_attr($idBoard, $token2['name'], 'hp', $token2['attrs']['hp']);
			}
			$action_string = $token1['name'].' attacks to '.$token2['name'];
			$action_string.= ' At:<span class="red">'.$at.'</span>=1d'.$dice[0]['size'].'+'.$dice[0]['mod'];
			$action_string.= $distance_mod>0?'+1 short range':'';
			$action_string.= $distance_mod<0?'-1 long range':'';
			$action_string.= $distance_mod==0?'+0 medium range':'';
			if ($hit) {
				$action_string.= ' Dmg:<span class="red">'.$damage.'</span>='.$dice[1]['n'].'d'.$dice[1]['size'];
				$action_string.= $dice[1]['mod']>0?'+'.$dice[1]['mod']:'';
				$action_string.= $dice[1]['mod']<0?'-'.$dice[1]['mod']:'';
				$action_string.= $critic?' <span class="red">CRITICAL HIT</span>':'';
			} else {
				$action_string.= ' <span class="red">FAIL</span>';
			}
			$action_string.= ' '.($guideline_n-1).' remmain';
			if ($guideline_n>0)		guideline_remove_counter($idBoard, $token1['name'], 2);
			set_dice($idBoard, $token1['name'], $dice[0]['result'].' '.$dice[1]['result'], $token2['name']);
		} else {
			$action_string = $token1['name'].' attacks to '.$token2['name'];
			$action_string.= ' but target is out of range';
			set_dice($idBoard, $token1['name'], 'Out of range', $token2['name']);
		}
	} else {	# No ammo
		$action_string = 'No ammo';
		set_dice($idBoard, $token1['name'], 'No ammo', $token2['name']);
	}
	insert_action($idBoard, $action_string);
}
