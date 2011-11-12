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
		$user = mysql_real_escape_string($_POST["user"]);
		$message = mysql_real_escape_string($_POST["message"]);
		$game = mysql_real_escape_string($_POST["game"]);

		// gets the unix epoch time (number of seconds since january 1st 1970)
		$epochTime = time();

		// select the database to operate on
		mysql_select_db($DB_NAME, $DB_CONNECTION);

		// construct a query to perform on the database
		$databaseQuery = "INSERT INTO " . $DB_TABLE . " (user, message, time, game) VALUES ('" . $user . "', '" . $message . "', '" . $epochTime . "', '" . $game . "')";

		// perform the query constructed above on the database
		mysql_query($databaseQuery, $DB_CONNECTION);
	}


	// Team Jiminy Cricket


?>