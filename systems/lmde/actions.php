<?php
function lmde_check($idBoard, $token, $attr){
	$val = get_attr($idBoard, $token['name'], $attr);
	$mod = mod($val);
	$d20 = one_roll(1,20);
	$result = $d20+$mod;
	set_output($idBoard, $token['name'], mb_ucfirst(_(strtoupper($attr))).' '.$result);
	$action_string = '<span class="name_text">'.$token['name'].'</span> '._('CHECK').' '._(strtoupper($attr));
	$mod = $mod>0?'+'.$mod:$mod;
	$action_string.= "<span class='attack_text'><span class='red'>$result</span>=$d20(1d20)";
	$action_string.= "&nbsp;$mod("._(strtoupper($attr)).")</span>";
	insert_action($idBoard, $action_string);
}


function lmde_charge($idBoard, $token){
	$turn = get_turn($idBoard);
	$step_movement = get_step($idBoard, $token['name'], 'movement');
	$step_action = get_step($idBoard, $token['name'], 'action');
	if (floor($step_movement['current'])==$step_movement['max'] && $step_action['current']>0){
		$new_mov = $step_movement['max']*2;
		set_step($idBoard, $token['name'], 'movement', $new_mov);
		set_output($idBoard, $token['name'], _('READY TO CHARGE'));
		set_mod($idBoard, $token['name'], 'thaco', 'charge', _('CHARGE'), 2, $turn);
		set_mod($idBoard, $token['name'], 'ac', 'charge', _('CHARGE'), -4, $turn);
	} else {
		set_output($idBoard, $token['name'], _('CAN NOT CHARGE'));
	}
}

function lmde_defensive($idBoard, $token){
	$turn = get_turn($idBoard);
	$newTurn = $turn+1;
	$bDefensive = has_status($idBoard, $token['name'], 'defensive');
	if ($bDefensive){
		remove_status($idBoard, $token['name'], 'defensive');
		set_output($idBoard, $token['name'], _('READY'));
	} else {
		set_output($idBoard, $token['name'], _('DEFENSIVE'));
		set_mod($idBoard, $token['name'], 'thaco', 'defensive', _('DEFENSIVE'), -4, $newTurn);
		set_mod($idBoard, $token['name'], 'ac', 'defensive', _('DEFENSIVE'), 2, $newTurn);
	}
}

function lmde_health_potion($token_id, $inventory_id){
	$inv = get_inventory_by_id($inventory_id);
	if ($inv['n']>0){
		error_log("BEBO POCION");
		$d8 = one_roll(1,8);
		$token = get_token_by_id($token_id);
		$hp = get_attr2($token_id, 'hp');
		$max_hp = get_attr2($token_id, 'maxhp');
		$new_hp = $hp+$d8>$max_hp?$max_hp:$hp+$d8;
		set_attr2($token_id, 'hp', $new_hp);
		$action_string = "<p><span class='name_text'>".$token['name']."</span> "._('USES')." ".$inv['name'].' ';
		$action_string.= _('REACHS').' '.$new_hp.' '._('HP').'</p>';
		insert_action($token['idBoard'], $action_string);
		inventory_remove_counter($token['token_id'], $inv['name']);
	}
}
