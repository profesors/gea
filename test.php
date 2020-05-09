<?php
function apply_lights(){
	$im = imagecreatefromjpeg("img/bg/010bg.jpg");
	$ntilesx=imagesx($im)/70;
	$ntilesy=imagesy($im)/70;
	$black = imagecolorallocate($im, 0, 0, 0);
	$arrBlack = array();
	$max_d = 8;
	$pi2 = 3.14/2.0;
	for($d=0; $d<$max_d; $d++){
		$arrBlack[$d] = imagecolorallocatealpha($im, 0, 0, 0, 127*cos($pi2*(($d/$max_d))));
		echo 127*cos($pi2*($d/$max_d))."\n";
	}
	$px=8; $py=22;
	for ($y=0; $y<$ntilesy; $y++){
		for ($x=0; $x<$ntilesx; $x++){
			$d = floor(sqrt(pow($x-$px,2)+pow($y-$py,2)));
			if ($d>$max_d-1)	imagefilledrectangle($im, $x*70, $y*70, ($x+1)*70, ($y+1)*70, $black);
			else imagefilledrectangle($im, $x*70, $y*70, ($x+1)*70, ($y+1)*70, $arrBlack[$d]);
		}
	}
	imagejpeg($im, 'test.jpg', 100);
}
