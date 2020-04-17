<?php	
include_once('libSql.php');
include_once('libControllers.php');
include_once('guidelines/lmde.php');

connectDB();
#$_GET['m'] = "@g1 g1 tbar";
#$_GET['idBoard'] = 1;
# select * from attrs where idBoard = 4 AND tokenName in ('bar', 'gw1')

# Multiple spaces into just one
$m = str_replace('%20',' ',secure_param('m'));
$m = preg_replace('/[ ]+/', ' ', $m);
$idBoard = intval(secure_param('idBoard'));

if ($m == '' && $m != NULL && $idBoard <= 0) die("ERROR: Wrong parameters");

# Token name
$token_name = '';
if (preg_match("/@([^ ]+)/", $m, $arrTmp)){
	$token_name = $arrTmp[1];	
}

# Guide number
$guide_number = 0;
if (preg_match("/\sg(\d+)/", $m, $arrTmp)){
	$guide_number = $arrTmp[1];
}

# Target
$target = '';
if (preg_match("/\st([^ ]+)/", $m, $arrTmp)){
	$target = $arrTmp[1];
}

# Guideline
$guideline;
if ($token_name != '' && $guide_number != 0) {
	$guideline = get_guideline($idBoard, $token_name, $guide_number);
}
$f = getGuideActionFunction($guideline['guideAction']);
if (!is_null($f)){
	call_user_func($f, $idBoard, $token_name, $target, $guide_number);
} else {
	error_log("No guideline");
}
?>
