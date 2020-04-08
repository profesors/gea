<?php
include_once('../lib.php');
connectDB();
$idBoard = secure_param('idBoard');
# $idBoard = 4;

# Get Board
$query = "SELECT * FROM boards WHERE id = $idBoard LIMIT 1;";
$result = run_sql($query) or die();
$row = mysqli_fetch_array($result);
echo '{';
echo '"id": '.$row['id'].',';
echo '"name": "'.$row['name'].'",';
echo '"tilew": '.$row['tilew'].',';
echo '"tileh": '.$row['tileh'].',';
echo '"ntilesw": '.$row['ntilesw'].',';
echo '"ntilesh": '.$row['ntilesh'].',';
echo '"offsetx": '.$row['offsetx'].',';
echo '"offsety": '.$row['offsety'].',';
echo '"bg": "'.$row['bg'].'",';
echo '"drawGrid": '.$row['drawGrid'].',';
echo '"lastActionId": '.$row['lastActionId'];
echo '}';
