<?php


	// make sure that all errors are reported
	error_reporting(E_ALL);

	// make sure that no browsers are caching requests
	header("Cache-Control: no-cache");


	// database configuration settings
	$DB_HOST = "localhost";
	$DB_USER = "wepaint";
	$DB_PASS = "moose#goose#loose";
	$DB_NAME = "wepaint_data";
	$DB_TABLE = "wepaint_chat";

	// establish a database connection using our settings above
	$DB_CONNECTION = mysql_connect($DB_HOST, $DB_USER, $DB_PASS);

	if ($DB_CONNECTION)
	// a database connection was successful
	{
		// sanitize user input
		//$game = mysql_real_escape_string($_POST["game"]);
		$game = "123456";

		// select the database to operate on
		mysql_select_db($DB_NAME, $DB_CONNECTION);

		// 
		$databaseQuery = "SELECT user, message FROM " . $DB_TABLE . " WHERE game = '" . $game . "'";

		// 
		$databaseResult = mysql_query($databaseQuery, $DB_CONNECTION);

		$messagesToEcho = array();

		while ($databaseRow = mysql_fetch_array($databaseResult))
		// 
		{
			$messagesToEcho["user"] = $databaseRow["user"];
			$messagesToEcho["message"] = $databaseRow["message"];
		}

		mysql_close($DB_CONNECTION);

		echo json_encode($messagesToEcho);
	}


	// Team Jiminy Cricket


?>