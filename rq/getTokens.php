<?php
include_once('libSql.php');
connectDB();
$idBoard = secure_param('idBoard');
$fromActionId = secure_param('fromActionId');

#$fromActionId=10;
#$idBoard = 4;

# Get tokens from board
$query = "SELECT * FROM tokens WHERE idBoard = $idBoard AND actionId>$fromActionId;";
$result = run_sql($query) or die();
$arr = Array();
while($row = mysqli_fetch_array($result)){
	# Token from Database
	$r = new stdClass();
	$r->x = $row['x'];
	$r->y = $row['y'];
	$r->z = $row['z'];
	$r->w = $row['w'];
	$r->h = $row['h'];
	$r->step = $row['step'];
	$r->imgSrc = $row['img'];
	$r->name = $row['name'];
	$r->file = $row['file'];
	$r->border = $row['border'];
	$r->opacity = $row['opacity'];
	$r->actionId = $row['actionId'];
	$r->diceResult = trim($row['dice_result']);
	$r->diceActionId = $row['dice_actionId'];
	$r->diceActionTargets= $row['dice_action_targets'];
	$r->pc = $row['pc'];
	# Animations
	$r->animation = Array();
	$query = "SELECT * FROM animations WHERE idBoard=$idBoard AND tokenName='".$row['name'];
	$query.= "' AND action_id>=$fromActionId";
	$result_animations = run_sql($query);
	while($row_animation = mysqli_fetch_array($result_animations)){
		$animation = new stdClass();
		$animation->actionId = $row_animation['action_id'];
		$animation->typeId = $row_animation['type_id'];
		$animation->step = $row_animation['step'];
		$animation->delayAfterStep = $row_animation['delay_after_step'];
		$animation->src_x = $row_animation['src_x'];
		$animation->src_y = $row_animation['src_y'];
		$animation->target_x = $row_animation['target_x'];
		$animation->target_y = $row_animation['target_y'];
		array_push($r->animation, $animation);
	}
	# **
	$r->defaultGuideline = new stdClass();
	$r->defaultGuideline->n = $row['defaultGuideline'];
	# Attrs
	$query = "SELECT * FROM attrs WHERE idBoard=$idBoard AND tokenName='".$row['name']."';";
	$result_attrs = run_sql($query) or die();
	$r->attrs = Array();
	while($row_attr = mysqli_fetch_array($result_attrs)){
		$r->attrs[$row_attr['attr']] = $row_attr['val'];
	}
	# Guidelines
	$query = "SELECT * FROM guidelines WHERE idBoard=$idBoard AND tokenName='".$row['name']."'";
	$result_guidelines = run_sql($query) or die();
	$r->guidelines = Array();
	$guideline = new stdClass();
	while($row_guideline = mysqli_fetch_array($result_guidelines)){
		$r->guidelines[$row_guideline['guideNumber']] = $row_guideline['name'];
		if ($r->defaultGuideline->n==$row_guideline['guideNumber']){
			$r->defaultGuideline->icon = $row_guideline['icon'];
		}
	}
	array_push($arr, $r);
}
echo json_encode($arr, JSON_NUMERIC_CHECK);

