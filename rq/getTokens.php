<?php
include_once('libSql.php');
connectDB();
$idBoard = secure_param('idBoard');
$fromActionId = secure_param('fromActionId');

#$fromActionId=10;
#$idBoard = 4;

# Get tokens from board
$query = "SELECT * FROM tokens WHERE idBoard = $idBoard AND actionId>$fromActionId;";
#echo "**$query**";
$result = run_sql($query) or die();
$arr = Array();
while($row = mysqli_fetch_array($result)){
	$r = new stdClass();
	$r->x = $row['x'];
	$r->y = $row['y'];
	$r->z = $row['z'];
	$r->w = $row['w'];
	$r->h = $row['h'];
	$r->step = $row['step'];
	$r->imgSrc = $row['img'];
	$r->name = $row['name'];
	$r->border = $row['border'];
	$r->actionId = $row['actionId'];
	$r->diceResult = trim($row['dice_result']);
	$r->diceActionId = $row['dice_actionId'];
	$r->diceActionTargets= $row['dice_action_targets'];
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
		$r->guidelines[$row_guideline['guideNumber']] = $row_guideline['guideName'];
	}
	array_push($arr, $r);
}
echo json_encode($arr, JSON_NUMERIC_CHECK);

