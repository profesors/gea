<?php
include_once('libSql.php');
include_once('libControllers.php');

connectDB();
setup_lang();

$idBoard = secure_param('idBoard');
$op = secure_param('op');
# $idBoard = 1;

$query = "SELECT * FROM (SELECT * FROM actions WHERE idBoard = $idBoard ";
$query.= 'AND idUser = 1 ORDER BY ts DESC LIMIT 5) AS var ORDER BY ts ASC';
$result = run_sql($query) or die();

header('Content-Type: text/html; charset=utf-8');
while ($row = mysqli_fetch_array($result)){
	if (($op=='player' && strpos($row['action'],'!')) || strlen($row['action'])==0){
		// No mostrar al jugador esta acción	
	} else {
		echo '<time>'.date("H:i", strtotime($row['ts'])).'</time><p>'.$row['action']."</p>";
	}
} 


function TildesHtml($cadena) 
    { 
        return str_replace(array("á","é","í","ó","ú","ñ","Á","É","Í","Ó","Ú","Ñ"),
                                         array("&aacute;","&eacute;","&iacute;","&oacute;","&uacute;","&ntilde;",
                                                    "&Aacute;","&Eacute;","&Iacute;","&Oacute;","&Uacute;","&Ntilde;"), $cadena);     
    }
