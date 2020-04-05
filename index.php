<?php include('templates/header.php'); ?>
<div onclick="void(0);">	<!-- For Safari bug-feature https://stackoverflow.com/questions/24077725/mobile-safari-sometimes-does-not-trigger-the-click-event -->
	<div id="panelI">
		<div id="stdOutput"><?php echo date("> d/m/Y G:i");?></div>
	</div>

	<div id="input_hidden"></div>
	<div id="canvas">
		<input type="text" id="stdInput" placeholder="Input...">
		<!--<div id="canvas_dados"></div>-->
	</div>
	<?php include('templates/panelD.php'); ?>
</div>
<?php include('templates/foot.php'); ?>
