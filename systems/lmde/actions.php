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
