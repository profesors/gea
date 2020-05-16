<?php
include_once('libSql.php');
include_once('libControllers.php');

connectDB();
setup_lang();

$attr = secure_param('attr');
$token_id = secure_param('tokenId');
$newVal = secure_param('newVal');

$token = get_token_by_id($token_id);

error_log("CAMBOANDO");
set_attr($token['idBoard'], $token['name'], $attr, $newVal);
