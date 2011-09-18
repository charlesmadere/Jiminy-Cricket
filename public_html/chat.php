<?php


	require_once("../facebook-php-sdk/src/facebook.php");

	$config = array();
	$config['appId'] = '';
	$config['secret'] = '';
	$config['fileUpload'] = false;

	$facebook = new Facebook($config);


?>