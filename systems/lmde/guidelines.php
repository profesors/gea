<?php

# Fight agains target in close combat
function lmde_attack($idBoard, $tokenName1, $tokenName2, $guideline){
	$token1 = get_token_and_attrs($idBoard, $tokenName1);
	$token2 = get_token_and_attrs($idBoard, $tokenName2);
	$guideAction = splitGuideAction($guideline);
	$dice = roll_dice($guideAction['attack'].','.$guideAction['damage']);
	$arrDist = distanceTokens($token1, $token2);
	if (floor($arrDist['d'])<=1){
		$at = $dice[0]['result'];	# Just to test if it is a critic
		$critic = testAndRunCritic($dice);
		$damage = $dice[1]['result'];
		$ac = $token2['attrs']['ac'];
		$hit = runHit($idBoard, $at, $damage, $token2);
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
function lmde_rangedAttack($idBoard, $tokenName1, $tokenName2, $guideline){
	$token1 = get_token_and_attrs($idBoard, $tokenName1);
	$token2 = get_token_and_attrs($idBoard, $tokenName2);
	$guideAction = splitGuideAction($guideline);
	$dice = roll_dice($guideAction['attack'].','.$guideAction['damage']);
	$arrDist = distanceTokens($token1, $token2);
	$distance_mod = 0;
	if ($arrDist['d']<=$guideAction['range'][2])	$distance_mod=-1;
	if ($arrDist['d']<=$guideAction['range'][1])	$distance_mod=0;
	if ($arrDist['d']<=$guideAction['range'][0])	$distance_mod=1;
	$action_string;
	if ($guideline['n']!=0){	# >0 proyectiles; or -1 for infinite
		if ($arrDist['d']>1 && floor($arrDist['d']) <= $guideAction['range'][2]){
			$at = $dice[0]['result'];	# Just to test if it is a critic
			$critic = testAndRunCritic($dice);
			$damage = $dice[1]['result'];
			$hit = runHit($idBoard, $at+$distance_mod, $damage, $token2);
			$action_string = $token1['name'].' attacks to '.$token2['name'];
			$action_string.= ' At:<span class="red">'.($at+$distance_mod).'</span>=1d'.$dice[0]['size'].'+'.$dice[0]['mod'];
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
			$action_string.= ' '.($guideline['n']-1).' remain';
			if ($guideline['n']>0)		guideline_remove_counter($idBoard, $token1['name'], 2);
			set_dice($idBoard, $token1['name'], ($dice[0]['result']+$distance_mod).' '.$dice[1]['result'], $token2['name']);
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

# Check if is a critical hit and apply extra damage
function testAndRunCritic($dice){
	$critic = false;
	if (($dice[0]['result']-$dice[0]['mod'])==20) {	# We need the natural result from dice
		for($i=0; $i<$dice['1']['n']; $i++){
			$dice[1]['result'] += rand(1, $dice[1]['size']);
		}
		$dice[1]['n']*=2;
		$critic = true;
	}
	return $critic;
}

# Split a guidelineAction into fields
function splitGuideAction($guideline){
	$guideAction = Array();
	$guideAction['range'] = getGuideActionByCode('r', $guideline['guideAction']);	
	$guideAction['range'] = explode(',', $guideAction['range']);
	$guideAction['attack'] = getGuideActionByCode('a', $guideline['guideAction']);
	$guideAction['damage'] = getGuideActionByCode('d', $guideline['guideAction']);
	return $guideAction;
}

# Test if it is hit and damage
function runHit($idBoard, $at, $damage, $targetToken){
	$hit = false;
	if ($at >= $targetToken['attrs']['ac']){
		$hit = true;
		$targetToken['attrs']['hp']-=$damage;
		set_attr($idBoard, $targetToken['name'], 'hp', $targetToken['attrs']['hp']);
	}
	return $hit;
}
