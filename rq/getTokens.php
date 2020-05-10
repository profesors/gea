<?php
include_once('libSql.php');
connectDB();
$idBoard = secure_param('idBoard');
$fromActionId = secure_param('fromActionId');

#$fromActionId=10;
#$idBoard = 1;

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
	$r->imgSrc = $row['img'];
	$r->name = $row['name'];
	$r->file = $row['file'];
	$r->border = $row['border'];
	$r->opacity = $row['opacity'];
	$r->actionId = $row['actionId'];
	$r->pc = $row['pc'];

	$path = explode(',',$row['path']);
	$r->path = null;
	if (sizeof($path)>1){
		$r->path = array();
		for ($i=0; $i<sizeof($path); $i+=2){
			array_push($r->path, array('x'=>$path[$i],'y'=>$path[$i+1]));
		}
	}
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
	# Output
	$q = "SELECT * FROM output WHERE idBoard=$idBoard AND tokenName='".$row['name']."' AND action_id>=$fromActionId";
	$result_output = run_sql($q) or die();
	if ($row_output = mysqli_fetch_array($result_output)){
		$r->output = new stdClass();
		$r->output->actionId = $row_output['action_id'];
		$r->output->text = $row_output['text'];
		$r->output->sound = $row_output['sound'];
	}
	# **
	# Steps
	$q = "SELECT * FROM steps WHERE idBoard=$idBoard AND tokenName='".$row['name']."'";
	$result_steps = run_sql($q) or die();
	$r->steps = array();
	while($row_steps = mysqli_fetch_array($result_steps)){
		$step = new stdClass();
		//$step->type = $row_steps['type'];
		$step->current = $row_steps['current'];
		$step->max = $row_steps['max'];
		//array_push($r->steps, $step);
		$r->steps[$row_steps['type']] = $step;
	}
	# end Steps

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

