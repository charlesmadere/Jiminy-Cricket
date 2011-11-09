<?php


	// make sure that all errors are reported
	error_reporting(E_ALL);

	// make sure that output is treated as xml
	header("Content-type: text/xml");

	// make sure that no browsers are caching requests
	header("Cache-Control: no-cache");

	// database configuration settings
	$DB_HOST = "localhost";
	$DB_USER = "wepaint";
	$DB_PASS = "moose#goose#loose";
	$DB_NAME = "wepaint_data";
	$DB_TABLE = "testmessages";
	$STORE_NUM = 128;
	$DISPLAY_NUM = 64;
	
	// facebook configuration settings
	$FB_APPID = "211936785535748";
	$FB_APPSECRET = "760f613bc10ba7bb970b3b4df4c1ff87";
	$FB_SCOPE = "email,publish_stream,user_about_me";
	$FB_REDIRECT = "http://www.wepaint.us/";

	require("../facebook.php");

	$facebook = new Facebook
	(
		array
		(
			'appId' => $FB_APPID,
			'secret' => $FB_APPSECRET,
			'cookie' => true
		)
	);

	$user = $facebook->getUser();

	if ($user)
	{
		try
		{
			$user_profile = $facebook->api('/me');
		}
		catch (FacebookApiException $e)
		{
			error_log($e);
			$user = null;
		}
	}


	if ($user)
	{
		$userInfo = $facebook->api("/$user");

		// establish a database connection using our settings above
		$DB_CONNECTION = mysql_connect($DB_HOST, $DB_USER, $DB_PASS);

		if ($DB_CONNECTION)
		{
			// select the database to operate on
			mysql_select_db($DB_NAME, $DB_CONNECTION);

			foreach ($_POST as $key => $value)
			// looks through all POST data, creates a variable for every parameter and assigns it a corresponding value
			{
				$$key = mysql_real_escape_string($value, $DB_CONNECTION);
			}

			// get the current system time in seconds (the epoch)
			$epochTime = time();

			if (@$action == "postmsg")
			// inserts a new message into the table and also removes any messages past the $STORE_NUM mark
			{
				// inserts the new message
				//mysql_query("INSERT INTO $DB_TABLE (`user`, `msg`, `time`) VALUES ('$name', '$message', '$epochTime')", $DB_CONNECTION);
				mysql_query("INSERT INTO $DB_TABLE (`user`, `msg`, `time`) VALUES ('" . $userInfo['name'] . "', '$message', '$epochTime')", $DB_CONNECTION);

				// removes any messages past the $STORE_NUM mark
				mysql_query("DELETE FROM $DB_TABLE WHERE id <= " . (mysql_insert_id($DB_CONNECTION) - $STORE_NUM), $DB_CONNECTION);
			}

			// grab only the author and text of each message; grab only the messages that have not been
			// downloaded before; order the messages so that the latest comes last; limit the number
			// of messages fetched to the number defined in the configuration settings up top
			$testmessages = mysql_query("SELECT user, msg FROM $DB_TABLE WHERE time>$time ORDER BY id ASC LIMIT $DISPLAY_NUM", $DB_CONNECTION);

			echo "<?xml version=\"1.0\"?>\n";
			echo "<response>\n";
			echo "\t<status>" . $status_code . "</status>\n";
			echo "\t<time>" . $epochTime . "</time>\n";

			if (mysql_num_rows($testmessages) != 0)
			// ensure that the table isn't empty and that we can therefore read messages from it
			{
				while ($message = mysql_fetch_array($testmessages))
				// loop until there are no more messages in the table left to fetch
				{
					echo "\t<message>\n";
					echo "\t\t<author>" . $message["user"] . "</author>\n";
					echo "\t\t<text>" . htmlspecialchars(stripslashes($message["msg"])) . "</text>\n";
					echo "\t</message>\n";
				}
			}
			echo "</response>";

			mysql_close($DB_CONNECTION);
		}
	}


	// Team Jiminy Cricket


?>