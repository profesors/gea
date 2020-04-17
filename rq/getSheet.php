<?php
include_once('libSql.php');

connectDB();

$idBoard = secure_param('idBoard');
$name = secure_param('name');

$idBoard = 1;
$name = "bar";

$token = get_token($idBoard, $name);
$token['attrs'] = get_attrs($idBoard, $name);
$token['guidelines'] = get_guidelines($idBoard, $name);
#print_r($token);

$sheet = file_get_contents("../sheets/$name.html");
preg_match_all("/_([tag]):([^_]*)_/", $sheet, $arrExp);
#print_r($token);die();
#print_r($arrExp);die();
for($i=0; $i<sizeof($arrExp[0]); $i++){
	$replace = $arrExp[0][$i];
	$type = $arrExp[1][$i];
	$with;
	switch ($type){
		case 't':
			$with = $token[$arrExp[2][$i]];
			break;
		case 'a':
			$with = $token['attrs'][$arrExp[2][$i]];
			break;
		case 'g':
			$arrGuide = explode(':',$arrExp[2][$i]);
			$with = $token['guidelines'][$arrGuide[1]][$arrGuide[0]];
			break;
	}
	$sheet = str_replace($replace, $with, $sheet);
}
#print_r($arrExp);
echo $sheet;

