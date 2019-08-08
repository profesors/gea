<?php
include_once('../lib.php');
connectDB();
$idBoard = secure_param('idBoard');
//$idBoard = 2;

# Get Board
$query = "SELECT * FROM boards WHERE id = $idBoard LIMIT 1;";
$result = run_sql($query) or die();
$row = mysqli_fetch_array($result);
echo $row['id']."\n";
echo $row['name']."\n".$row['tilew']."\n".$row['tileh']."\n";
echo $row['ntilesw']."\n".$row['ntilesh']."\n";
echo $row['bg']."\n".$row['drawGrid']."\n".$row['lastActionId']."\n";


