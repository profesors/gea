<?php
include_once('libSql.php');
include_once('libControllers.php');

connectDB();
setup_lang();

$idBoard = secure_param('idBoard');
$op = secure_param('op');
#$idBoard = 1;

$query = "SELECT * FROM (SELECT * FROM actions WHERE idBoard = $idBoard ";
$query.= 'AND idUser = 1 ORDER BY ts DESC LIMIT 5) AS var ORDER BY ts ASC';
$result = run_sql($query) or die();

#header('Content-Type: text/html; charset=utf-8');
$arr_actions = Array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
	//echo '<time>'.date("H:i", strtotime($row['ts'])).'</time><p>'.$row['action']."</p>";
	$r = new stdClass();
	$r->time = '<time>'.date("H:i", strtotime($row['ts'])).'</time>';
	$r->text = '<p>'.$row['action'].'</p>';
	array_push($arr_actions, $r);
} 
echo json_encode($arr_actions, JSON_NUMERIC_CHECK);
#echo json_last_error_msg();



function TildesHtml($cadena) 
    { 
        return str_replace(array("á","é","í","ó","ú","ñ","Á","É","Í","Ó","Ú","Ñ"),
                                         array("&aacute;","&eacute;","&iacute;","&oacute;","&uacute;","&ntilde;",
                                                    "&Aacute;","&Eacute;","&Iacute;","&Oacute;","&Uacute;","&Ntilde;"), $cadena);     
    }
