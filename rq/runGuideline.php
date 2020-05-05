<?php	
include_once('libSql.php');
include_once('libControllers.php');
include_once('../systems/lmde/guidelines.php');
connectDB();
setup_lang();

#$_GET['m'] = "@elf tg1";
#$_GET['idBoard'] = 1;
# select * from attrs where idBoard = 4 AND tokenName in ('bar', 'gw1')

# Multiple spaces into just one
$m = str_replace('%20',' ',secure_param('m'));
$m = preg_replace('/[ ]+/', ' ', $m);
$idBoard = intval(secure_param('idBoard'));
error_log("GUIDELINE: $m");

if ($m == '' && $m != NULL && $idBoard <= 0) die("ERROR: Wrong parameters");

# Token name
$token_name = '';
if (preg_match("/@([^ ]+)/", $m, $arrTmp)){
	$token_name = $arrTmp[1];	
}

# Guide number
$guide_number = 0;	# 0 = DefaultGuideline
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
if ($token_name != '') {
	$guideline = get_guideline($idBoard, $token_name, $guide_number);	# If guide_number==0: default guideline
}
if (!is_null($guideline)){	# If still no guideline, do nothing
	$f = getGuideActionFunction($guideline['guideAction']);
	if (!is_null($f)){
		$token1 = get_token_and_attrs($idBoard, $token_name);
		$token2 = get_token_and_attrs($idBoard, $target);
		$guideline['guideAction'] = splitGuideAction($guideline);
		try{
			call_user_func($f, $idBoard, $token1, $token2, $guideline);
		} catch(Exception $e){
			error_log("ERROR runGuideline.php: No call_user_func\n");
		}
	} else {
		error_log("ERROR runGuideline.php: No guideline");
	}
}
?>
