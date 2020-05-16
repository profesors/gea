<!DOCTYPE html>
<head lang="es">
	<title>Gea Master</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">
	<meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="stylesheet" type="text/css" href="css/reset.css?t=1">
    <link rel="stylesheet" type="text/css" href="css/master.css?t=1">
	<script src='js/master.js?t=1'></script>

</head>
<body>
	<main>
	<?php
	$idBoard = 1;
	include_once('rq/libSql.php');
	include_once('rq/libControllers.php');
	connectDB();
	setup_lang();
	$rs_tokens = get_tokens_by_board($idBoard);
	while($token = mysqli_fetch_array($rs_tokens, MYSQLI_ASSOC)){
		$attrs = get_attrs($idBoard, $token['name']);
		echo "<h3>".$token['name']."</h3>";
		echo "<table style='border:1;'>";
		echo "<tr>";
		foreach($attrs as $k=>$attr){
			echo "<th>$k</th>";
		}
		echo "</tr>";
		foreach($attrs as $k=>$attr){
			echo "<td><input type='text' name='attr_".$token['token_id']."_$k' class='attr_val' value='$attr'";
			echo " onchange='attr_change(".$token['token_id'].",\"$k\",this.value);'></td>";
		}
		echo "</table>";
	}
?>
	</main>
	<footer>
	</footer>
</body>
</html>