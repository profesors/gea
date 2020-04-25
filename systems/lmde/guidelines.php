<?php
$token_file = null;

# Esta debe ser general
function lmde_generic_attack($idBoard, &$token1, &$token2, &$guideline){
	#print_r($token1); print_r($guideline); die();
	$arrDist = distanceTokens($token1, $token2);
	compute_mods($idBoard, $token1, $token2, $guideline);

	$d20 = one_roll(1,20);
	$critic = $d20==20?true:false;

	$ac = $token2['attrs']['ac'];
	$sMod = '';
	$at_total = $d20;
	if (!array_key_exists('at_mod', $guideline['guideAction'])){
		$guideline['guideAction']['at_mod'] = array();
	}
	for($i=0; $i<sizeof($guideline['guideAction']['at_mod']);$i++){
		$mod_val = $guideline['guideAction']['at_mod'][$i]['mod'];
		$mod_desc = $guideline['guideAction']['at_mod'][$i]['desc'];
		if ($mod_val>0) $sMod.= ' +'.abs($mod_val).'('.strtolower(_($mod_desc)).')';
		if ($mod_val<0) $sMod.= ' -'.abs($mod_val).'('.strtolower(_($mod_desc)).')';
		$at_total += $mod_val;
	}

	$action_string = '<span class="name_text">'.$token1['name'].'</span> '._('ATTACKS TO').' ';
	$action_string.= '<span class="name_text">'.$token2['name'].'</span> '._('WITH').' '.$guideline['name'];
	$action_string.= '<span class="attack_text">'.mb_ucfirst(_('ATTACK')).'&nbsp;<span class="red">'.$at_total;
	$action_string.= '</span>='.$d20.'(1d20)'.$sMod.'</span>';
	if ($at_total >= $ac){	# HIT
		$sMod='';
		$damage = one_roll($guideline['guideAction']['damage']['n'], $guideline['guideAction']['damage']['sides']);
		$damage_total = $damage;
		if (!array_key_exists('dmg_mod', $guideline['guideAction'])){
			$guideline['guideAction']['dmg_mod'] = array();
		}
		for($i=0; $i<sizeof($guideline['guideAction']['dmg_mod']);$i++){
			$mod_val = $guideline['guideAction']['dmg_mod'][$i]['mod'];
			$mod_desc = $guideline['guideAction']['dmg_mod'][$i]['desc'];
			if ($mod_val>0) $sMod.= ' +'.abs($mod_val).'('.strtolower(_($mod_desc)).')';
			if ($mod_val<0) $sMod.= ' -'.abs($mod_val).'('.strtolower(_($mod_desc)).')';
			$damage_total+=$mod_val;
		}
		if ($critic) $damage_total*=2;
		$token2['attrs']['hp']-=$damage_total;
		set_attr($idBoard, $token2['name'], 'hp', $token2['attrs']['hp']);

		$action_string.= '<span class="dmg_text">'.mb_ucfirst(_('DAMAGE')).'&nbsp;';
		$action_string.= '<span class="red">'.$damage_total.'</span>='.$damage.'(';
		$action_string.= $guideline['guideAction']['damage']['n'].'d'.$guideline['guideAction']['damage']['sides'];
		$action_string.= ')'.$sMod;
		$action_string.= $critic?' <span class="red">(x2)'._('CRITICAL HIT').'</span>':'';
		set_dice($idBoard, $token1['name'], $at_total.' '.$damage_total, $token2['name']);
	} else {
		$action_string.= ' <span class="red">'._('FAIL').'</span>';
		set_dice($idBoard, $token1['name'], $at_total.' '._('FAIL'), $token2['name']);
	}
	$action_string.= '</span>';
	if ($guideline['n'] != -1) {
		$action_string.= ' '._('AMMUNITION').' '.$guideline['name'].' '.($guideline['n']-1);
	}
	insert_action($idBoard, $action_string);
}

# Close Combat Attack
function lmde_attack($idBoard, $token1, $token2, $guideline){
	$arrDist = distanceTokens($token1, $token2);
	if (floor($arrDist['d'])<=1){
		lmde_generic_attack($idBoard, $token1, $token2, $guideline);
		set_animation($idBoard, $token1['name'], 1, 0, 1, $token1['x'], $token1['y'], $token2['x'], $token2['y']);
	} else {
		$action_string = _('OUT OF RANGE');
		set_dice($idBoard, $token1['name'], $action_string, $token2['name']);
		insert_action($idBoard, $action_string);
	}
}

# Ranged Attack
function lmde_rangedAttack($idBoard, $token1, $token2, $guideline){
	#print_r($token1); print_r($guideline); die();
	# Ammunition
	if ($guideline['n']!=0){
		$arrDist = distanceTokens($token1, $token2);
		if (floor($arrDist['d'])>1 && floor($arrDist['d']) <= $guideline['guideAction']['range'][2]){
			# Distance mod
			$distance_mod = 0;
			if ($arrDist['d']<=$guideline['guideAction']['range'][2])	$distance_mod=-1;
			if ($arrDist['d']<=$guideline['guideAction']['range'][1])	$distance_mod=0;
			if ($arrDist['d']<=$guideline['guideAction']['range'][0])	$distance_mod=1;
			add_mod_attack($guideline, $distance_mod, _('DISTANCE'));
			# Attack
			guideline_remove_counter($idBoard, $token1['name'], $guideline['guideNumber']);
			lmde_generic_attack($idBoard, $token1, $token2, $guideline);
			set_animation($idBoard, $token1['name'], 1, 0, 2, $token1['x'], $token1['y'], $token2['x'], $token2['y']);
		} else {
			$action_string = _('OUT OF RANGE');
			set_dice($idBoard, $token1['name'], $action_string, $token2['name']);
			insert_action($idBoard, $action_string);
		}
	} else {
		$action_string = _('NO AMMO');
		set_dice($idBoard, $token1['name'], $action_string, $token2['name']);
		insert_action($idBoard, $action_string);
	}
}

function lmde_mm($idBoard, $token1, $token2, $guideline){
	if ($guideline['n']!=0){
		$d6 = one_roll(1,6);
		$token2['attrs']['hp'] -= $d6+1;
		$action_string = '<span class="name_text">'.$token1['name'].'</span> '._('ATTACKS TO').' ';
		$action_string.= '<span class="name_text">'.$token2['name'].'</span> '._('WITH').' '.$guideline['name'];
		$action_string.= '<span class="dmg_text">'.mb_ucfirst(_('DAMAGE')).'&nbsp;<span class="red">'.($d6+1);
		$action_string.= '</span>';
		$action_string.= "=$d6(1d6)+1";
		guideline_remove_counter($idBoard, $token1['name'], $guideline['guideNumber']);
		set_animation($idBoard, $token1['name'], 1, 0, 3, $token1['x'], $token1['y'], $token2['x'], $token2['y']);
		set_attr($idBoard, $token2['name'], 'hp', $token2['attrs']['hp']);
		set_dice($idBoard, $token1['name'], $guideline['name'], $token2['name']);
	} else {
		$action_string = '<span class="name_text">'.$token1['name'].'</span> ';
		$action_string.= ' '._('NO SPELLS').' '.$guideline['name'];
		set_dice($idBoard, $token1['name'], _('NO SPELLS'), $token2['name']);
	}
	insert_action($idBoard, $action_string);
}

# ************************************** GENERAL PURPOSE ***************************


# Split a guidelineAction into fields
function splitGuideAction($guideline){
	$guideAction = Array();
	$guideAction['string_guideline'] = $guideline['guideAction'];
	$guideAction['range'] = getGuideActionByCode('r', $guideline['guideAction']);	
	$guideAction['range'] = explode(',', $guideAction['range']);
	$guideAction['damage'] = getGuideActionByCode('d', $guideline['guideAction']);
	$guideAction['damage'] = split_dice($guideAction['damage']);
	return $guideAction;
}

function compute_mods($idBoard, &$token1, &$token2, &$guideline){
	$arrAtMods_id = explode(',',getGuideActionByCode('ba', $guideline['guideAction']['string_guideline']));
	$arrDamageMods_id = explode(',',getGuideActionByCode('bd', $guideline['guideAction']['string_guideline']));
	$token2_file = json_decode(file_get_contents('../systems/lmde/tokens/'.$token2['file'].'.json'));
	foreach($arrAtMods_id as $mod_id){
		switch ($mod_id){
		case 1:		# THACO
			error_log("**".$token1['attrs']['thaco']);
			add_mod_attack($guideline, $token1['attrs']['thaco'], _('THACO'));
			break;
		case 2:		# STR to attack
			add_mod_attack($guideline, mod($token1['attrs']['str']), _('STR'));
			break;
		case 3:		# DEX to attack
			add_mod_attack($guideline, mod($token1['attrs']['dex']), _('DEX'));
			break;
		case 10:	# Ranger favored enemy
			if (property_exists($token2_file, 'tags') && in_array('goblinoid', $token2_file->tags)){
				add_mod_attack($guideline, 2, _('FAVORED ENEMY'));
			}	
			break;
		}
	}
	foreach($arrDamageMods_id as $mod_id){
		switch ($mod_id){
		case 1:		# STR to damage
			add_mod_damage($guideline, mod($token1['attrs']['str']), _('STR'));
			break;
		}
	}
}

function add_mod_attack(&$guideline, $mod, $desc){
	if (!array_key_exists('at_mod', $guideline['guideAction']))	$guideline['guideAction']['at_mod'] = array();
	$arrMod = array('desc'=>$desc, 'mod'=>$mod);
	array_push($guideline['guideAction']['at_mod'], $arrMod);
}

function add_mod_damage(&$guideline, $mod, $desc){
	if (!array_key_exists('dmg_mod', $guideline['guideAction']))	$guideline['guideAction']['dmg_mod'] = array();
	$arrMod = array('desc'=>$desc, 'mod'=>$mod);
	array_push($guideline['guideAction']['dmg_mod'], $arrMod);
}


function mod($car){
	switch($car){
	case 3:
		return -3;
	case 4:
	case 5:
		return -2;
	case 6:
	case 7:
	case 8:
		return -1;
	case 9:
	case 10:
	case 11:
	case 12:
		return 0;
	case 13:
	case 14:
	case 15:
		return 1;
	case 16:
	case 17:
		return 2;
	case 18:
		return 3;
	}
}
