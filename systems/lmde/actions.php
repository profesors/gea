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
	error_log("TURN $turn");
	$step_movement = get_step($idBoard, $token['name'], 'movement');
	$step_action = get_step($idBoard, $token['name'], 'action');
	if (floor($step_movement['current'])==$step_movement['max'] && $step_action['current']>0){
		$new_mov = $step_movement['max']*2;
		set_step($idBoard, $token['name'], 'movement', $new_mov);
		set_output($idBoard, $token['name'], _('READY TO CHARGE'));
		set_mod($idBoard, $token['name'], 'thaco', 'charge', _('CHARGE'), 2, $turn);
	} else {
		set_output($idBoard, $token['name'], _('CAN NOT CHARGE'));
	}

}
