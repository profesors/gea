<?php
include('../../rq/libSql.php');
include('../../rq/libControllers.php');
include('guidelines.php');
connectDB();
setup_lang();
	
$idBoard = secure_param('idBoard');
$name = secure_param('name');

#$name = '@Groonan';
#$idBoard = 1;

$token = get_token($idBoard, $name);
$token_file = json_decode(file_get_contents('tokens/'.$token['file'].'.json'));
$attrs = get_attrs($idBoard, $name);
$guidelines = get_guidelines($idBoard, $name);
?>
<span class="sheet_left">
<h1><?php echo $token['name']; ?></h1>
<p><?php echo $token_file->short_description; ?></p>
	<img src="img/sheet/human_body2.png">
</span>

<span class="sheet_right">
<a class="close" onclick="closeInfoCharacter();">Cerrar</a>

<div class="section">
<span class="half">
<h2>Habilidades generales</h2>
<table>
	<tr><td><strong>Iniciativa</strong></td><td>+1</td></tr>
<?php
	$ac = $attrs['ac'];
	$rs_ac = get_mods_by_attr($idBoard, $token['name'], 'ac');
	$ac_desc = '';
	while($row_ac = mysqli_fetch_array($rs_ac, MYSQLI_ASSOC)){
		$ac+=$row_ac['mod'];
		$mod = $row_ac['mod']>=0?'+'.$row_ac['mod']:$row_ac['mod'];
		$ac_desc.=' '.$mod.'('.$row_ac['desc'].')';
	}
	$ac_desc = strlen($ac_desc)>0?$ac.'= '.$attrs['ac'].$ac_desc:$ac;
	?>
	<tr><td><strong>Clase de armadura</strong></td><td><?php echo $ac_desc; ?></td></tr>
	<tr><td><strong>Puntos de golpe</strong></td><td><?php echo $attrs['hp'].'/'.$attrs['maxhp'];?> PG</td></tr>
	<tr><td><strong>Movimiento</strong></td><td><?php echo $token_file->steps->movement;?> casillas</td></tr>
	<tr><td><strong>Moverse en silencio</strong></td><td>35%</td></tr>
	<tr><td><strong>Trepar paredes</strong></td><td>90%</td></tr>
</table>
</span>
<span class="half">
<h2>Maniobras</h2>
<table>
<?php	
	$bCharge = has_status($idBoard, $token['name'], 'charge');	
	$bDefensive = has_status($idBoard, $token['name'], 'defensive');	
?>
	<tr><td>
	<?php if ($bCharge){
		echo '<a class="select_box" style="cursor:pointer;">&#9989;</a>';
	} else {
		echo '<a class="select_box" style="cursor:pointer;"';
		echo ' onclick="sendCommand(\'@'.$token['name'].' mcharge\'); closeInfoCharacter();">&#9744;</a>';
	}?>
	</td><td><strong>Cargar</strong></td></tr>

	<tr><td>
	<?php if ($bDefensive){
		echo '<a class="select_box" style="cursor:pointer;"';
		echo ' onclick="sendCommand(\'@'.$token['name'].' mdefensive\'); ';
		echo ' refreshSheet('.$idBoard.',\''.$token['name'].'\');">&#9989;</a>';
	} else {
		echo '<a class="select_box" style="cursor:pointer;"';
		echo ' onclick="sendCommand(\'@'.$token['name'].' mdefensive\'); ';
		echo ' refreshSheet('.$idBoard.',\''.$token['name'].'\');">&#9744;</a>';
	}?>
	<td><strong>Lucha defensiva</strong></td></tr>
</table>
</span>
</div>

<div class="section">
	<span class="half">
	<h2>Características</h2>
	<table>
	<?php	$arr_car = ['str', 'dex', 'con', 'int', 'wis', 'car'];
	foreach($arr_car as $car){
		$command = '@'.$token['name'].' c'.$car;
		echo '<tr><td>';
		echo '<a onclick="javascript:sendCommand(\''.$command.'\'); closeInfoCharacter();"';
		echo 'class="select_box" style="cursor:pointer;">&#127922;</a>&nbsp;</td>';
		echo '<td class="car1"><strong>'.mb_strtoupper(_(mb_strtoupper($car))).'</strong></td>';
		$mod = mod($attrs[$car]);
		$mod = $mod>0?'+'.$mod:$mod;
		echo '<td class="car2">'.$attrs[$car].' ('.$mod.')</td></tr>'."\n";
	}?>
	</table>
	</span>

	<span class="half">
	<h2>Salvaciones</h2>
	<table>
	<?php 
		for($i=1; $i<=5; $i++){
			echo '<tr><td><strong>'.mb_ucfirst(_("SAVE".$i)).'</strong></td><td>'.$attrs['save'.$i].'</tr></tr>';
		}?>
	</table>
	</span>
</div>

<div class="section">
<h2><?php echo ucfirst(_('ACTIONS')); ?></h2>
<table>
<?php
	$default_guide_id = get_default_guideline_id($idBoard, $token['name']);
	foreach($guidelines as $guide_id=>$guideline){
		echo '<tr><td>';
		if ($guide_id != $default_guide_id){
			echo '<a onclick="javascript:showDefaultGuidelineInSheet(\''.$token['name'].'\','.$guide_id.');"';
			echo ' class="select_box">&#9744;</a>';
		} else {
			echo '&#9989;';
		}
		echo '</td>';
		echo '	<td><strong>'.ucfirst($guideline['name']).'</strong>&nbsp;';
		if ($guideline['n']!=-1){
			echo '('.$guideline['n'].')';
		} else {
			echo '	</td>';
			echo '	<td>'.ucfirst($token_file->guidelines[$guide_id-1]->short_desc).'</td>';
		}
		echo '</tr>';
	}	
?>
</table>
</div>
