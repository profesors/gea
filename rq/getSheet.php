<?php
include_once('libSql.php');
include_once('libControllers.php');

connectDB();
setup_lang();

$idBoard = secure_param('idBoard');
$name = secure_param('name');

#$idBoard = 1;
#$name = "bar";

$token = get_token($idBoard, $name);
$token['attrs'] = get_attrs($idBoard, $name);
$token['guidelines'] = get_guidelines($idBoard, $name);

$token_json = file_get_contents("../systems/lmde/tokens/$name.json");
$token_json = json_decode($token_json);

$sheet = file_get_contents("../systems/lmde/sheet.html");
preg_match_all("/%([tagfGS]):([^%]*)%/", $sheet, $arrExp);
#print_r($token_json);die();
#print_r($token);die();
#print_r($arrExp);die();
for($i=0; $i<sizeof($arrExp[0]); $i++){
	$replace = $arrExp[0][$i];
	$type = $arrExp[1][$i];
	$with;
	switch ($type){
		case 't':	# *T*oken field
			$with = $token[$arrExp[2][$i]];
			break;
		case 'a':	# *A*ttr field
			$with = $token['attrs'][$arrExp[2][$i]];
			break;
		case 'g':	# *G*uideline
			$arrGuide = explode(':',$arrExp[2][$i]);
			$with = $token['guidelines'][$arrGuide[1]][$arrGuide[0]];
			break;
		case 'f':	# from jason *F*ile 
			$field = $arrExp[2][$i];
			$with = $token_json->$field;
			break;
		case 'G':	# *G*uideline selected object or selected guideline
			$guide_id = $arrExp[2][$i];
			$default_guide_id = get_default_guideline_id($idBoard, $token['name']);
			if ($guide_id != $default_guide_id){
				$with = '<a onclick="javascript:showDefaultGuidelineInSheet(\''.$token['name'].'\','.$guide_id.');"';
				$with.= 'class="select_box">&#9744;</a>';
			} else {
				$with = '&#9989;';
			}
			break;
		case 'S':	# *S*ection
			$with = '<div class="section">';
			$with.= '<h2>'.ucfirst(_('ACTIONS')).'</h2>';
			$with.= '	<table>';
			$default_guide_id = get_default_guideline_id($idBoard, $token['name']);
			foreach($token['guidelines'] as $guideline_id => $guideline){
				$with.= '<tr><td>';
				if ($guideline_id != $default_guide_id){
					$with.= '<a onclick="javascript:showDefaultGuidelineInSheet(\''.$token['name'].'\','.$guideline_id.');"';
					$with.= 'class="select_box">&#9744;</a>';
				} else {
					$with.= '&#9989;';
				}
				$with.= '</td>';
				$with.= '	<td><strong>'.ucfirst($guideline['name']).'</strong>&nbsp;';
				if ($guideline['n']!=-1){
					$with.= '('.$guideline['n'].')';
					}
				$with.= '	</td>';
				$with.= '	<td>'.ucfirst($token_json->guidelines[$guideline_id-1]->short_desc).'</td>';
			}
			$with.= '</tr>';
			$with.= '	</table>';
			$with.= '</div>';
			break;
	}
	$sheet = str_replace($replace, $with, $sheet);
}
#print_r($arrExp);
echo $sheet;

