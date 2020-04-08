<?php
include_once('../lib.php');
connectDB();
$idBoard = secure_param('idBoard');
#$idBoard = 4;

# Get tokens from board
$query = "SELECT * FROM tokens WHERE idBoard = $idBoard;";
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
	$r->diceResult = trim($row['dice_result']);
	$r->diceAction = $row['dice_action'];
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
	while($row_guideline = mysqli_fetch_array($result_guidelines)){
		$r->guidelines[$row_guideline['guideName']] = $row_guideline['guideline'];
	}
	array_push($arr, $r);
}
echo json_encode($arr);

