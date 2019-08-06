<?php	
	include_once('../lib.php');

	$r = session_start();
	$db = mysqli_connect("localhost", "gea", "gea", "Gea");
	//$_GET['m'] = "d";
	$m = (array_key_exists('m', $_GET))?$_GET['m']:NULL;
	if ($m != NULL){
		switch ($m[0]){
			case '@':	// If receive "@1 d 4"	it means Move @1 to cell D 4
				$arrM = explode(' ', $m);
				$name = mysqli_real_escape_string($db, $arrM[0]);
				$toX = ord(mb_strtoupper($arrM[1]))-ord('A')+1;
				$toY = $arrM[2];
				update_items(1, $name, $toX, $toY);	// Update items table
				insert_action($db, $m, 1);			// Insert into action table
				break;
			case '#':	// If received "#1d6" generate a random number
				$mod = 0;
				echo "$m";
				$arrM = explode('+', ltrim($m, '#'));
				if (count($arrM)>1)	$mod = $arrM[1];
				$arrM = explode('-', $arrM[0]);
				if (count($arrM)>1) $mod = -$arrM[1];
				$arrM = explode('d', $arrM[0]);
				$n = $arrM[0];
				$d = $arrM[1];
				$sum = 0;
				for($i=0; $i<$n; $i++){
					$sum += rand(1,$d);
				}
				$sum += $mod;
				$action = "$m -> $sum";
				insert_action($db, $action, 1);
				break;
			default:
				insert_action($db, $m, 1);
		}
	} else {
		echo "Param m is NULL: $m";
	}
