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
	$DB_TABLE = "wepaint_canvas";

	// establish a database connection using our settings above
	$DB_CONNECTION = mysql_connect($DB_HOST, $DB_USER, $DB_PASS);

	if ($DB_CONNECTION)
	// a database connection was successful
	{
		// sanitize user input
		$game = mysql_real_escape_string($_POST["game"]);
		//$game = "4ee46831";
		$id = intval($_POST["id"]);
		//$id = 1;

		// select the database to operate on
		mysql_select_db($DB_NAME, $DB_CONNECTION);

		if ($id == -1)
		{
			// 
			$databaseQuery = "SELECT id FROM " . $DB_TABLE . " WHERE game = '" . $game . "'";

			// 
			$databaseResult = mysql_query($databaseQuery, $DB_CONNECTION);

			$AJAXReturn = 0;
			
			while ($databaseRow = mysql_fetch_array($databaseResult))
			// 
			{
				$temp = intval($databaseRow["id"]);

				if ($temp > $AJAXReturn)
				{
					$AJAXReturn = $temp;
				}
			}

			echo $AJAXReturn;
		}
		else
		{
			// 
			$databaseQuery = "SELECT id, user, canvas FROM " . $DB_TABLE . " WHERE game = '" . $game . "' AND id >= " . $id;

			// 
			$databaseResult = mysql_query($databaseQuery, $DB_CONNECTION);

			$AJAXReturn = array();

			while ($databaseRow = mysql_fetch_array($databaseResult))
			// 
			{
				$AJAXReturn["id"] = intval($databaseRow["id"]) + 1;
				$AJAXReturn["user"] = $databaseRow["user"];
				$AJAXReturn["canvas"] = $databaseRow["canvas"];
			}

			echo json_encode($AJAXReturn);
		}

		mysql_close($DB_CONNECTION);
	}


	// Team Jiminy Cricket


?>