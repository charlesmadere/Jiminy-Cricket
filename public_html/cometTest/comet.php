<?php


	// make sure that all errors are reported
	error_reporting(E_ALL);

	// make sure that no browsers are caching requests
	header("Cache-Control: no-cache");


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
	}


	// Team Jiminy Cricket


?>


<!doctype html>


<html lang="en">

	<head>
		<link href="../assets/stylesheets/basic.css" rel="stylesheet" type="text/css" />
		<link href="../assets/stylesheets/paint.css" rel="stylesheet" type="text/css" />
		<meta charset="UTF-8" />
		<script src="../assets/javascript/debugger.js" type="text/javascript"></script>
		<script src="../assets/javascript/basic.js" type="text/javascript"></script>
		<script src="../assets/javascript/chat.js" type="text/javascript"></script>
		<script src="../assets/javascript/jquery.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(document).ready
			(
				function()
				{
					chatInit(<?php echo "\"" . $userInfo['name'] . "\", \"" . 123456 . "\"" ?>);
				}
			);
		</script>
		<title>cometTest</title>
	</head>

	<body>
		<div id="header"></div>
		<div id="content">
			<div id="contentLeft">
				<div class="bottomBorder" id="currentWordAndTimeLeft"></div>
				<div class="bottomBorder" id="paintArea"></div>
				<div id="toolBox"></div>
			</div>
			<div id="contentRight">
				<div class="bottomBorder" id="currentTopic"></div>
				<div class="bottomBorder" id="whoIsPlaying"></div>
				<div id="chatArea">
					<span id="loading">Loading...</span>
				</div>
				<div id="chatAreaInput">
					<form id="chatForm">
						<input id="msg" maxlength="140" onclick="clearInput()" size="20" type="text" value="Say hi!" />
					</form>
				</div>
			</div>
		</div>
	</body>

</html>