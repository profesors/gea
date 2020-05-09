<!DOCTYPE html>
<head lang="es">
	<title>Gea</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">
	<meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="stylesheet" type="text/css" href="css/reset.css?t=1">
    <link rel="stylesheet" type="text/css" href="css/main.css?t=1">
    <link rel="stylesheet" type="text/css" href="css/sheet.css?t=1">
    <link rel="stylesheet" type="text/css" href="css/output.css?t=1">

	<script src='js/libGeneral.js?t=1'></script>
	<script src='js/Movement.js?t=1'></script>
	<script src='js/listeners.js?t=1'></script>
	<script src='js/main.js?t=1'></script>
	<script src='js/load.js?t=1'></script>
	<script src='js/interface.js?t=1'></script>
	<script src='js/animations.js?t=1'></script>
	<!--<script src='js/three.js'></script>
	<script src='js/three_main.js'></scrip>-->

</head>
<body id="body">
	<main id="main">
	<div onclick="void(0);">	
		<!-- For Safari bug-feature 
			https://stackoverflow.com/questions/24077725/mobile-safari-sometimes-does-not-trigger-the-click-event -->
		<div id="panelI">
			<div id="stdOutput"><?php echo date("> d/m/Y G:i");?></div>
		</div>
		<div id="board_output"></div>

		<div id="input_hidden"></div>
		<div id="canvas_over"></div>
		<div id="canvas">
			<input type="text" id="stdInput" placeholder="Input...">
		</div>
		<div id="canvas_bg"></div>
		<div id="info_character"><img src="img/loading.gif"></div>
		<?php //include('templates/panelD.php'); ?>
	</div>
	</main>
	<footer>
	</footer>
</body>
</html>
