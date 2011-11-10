<?php


	// make sure that all errors are reported
	error_reporting(E_ALL);

	// make sure that no browsers are caching requests
	header("Cache-Control: no-cache");


	if (!empty($_GET["game"]))
	// redirects user to index.php if they didn't follow a link or create a game
	{
		
	}
	else
	{
		header("Location: index.php");
		exit;
	}


	// facebook configuration settings
	$FB_APPID = "211936785535748";
	$FB_APPSECRET = "760f613bc10ba7bb970b3b4df4c1ff87";
	$FB_SCOPE = "email,publish_stream,user_about_me";
	$FB_REDIRECT = "http://www.wepaint.us/entry.php?game=" . $_GET["game"];

	require("facebook.php");

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

	$loginUrl = $facebook->getLoginUrl
	(
		array
		(
			'scope' => $FB_SCOPE,
			'redirect_uri' => $FB_REDIRECT
		)
	);

	$logoutUrl = $facebook->getLogoutUrl();


	if ($user)
	{
		$userInfo = $facebook->api("/$user");
	}


	// Team Jiminy Cricket


?>


<!doctype html>


<html lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">

	<head>
		<link href="assets/stylesheets/basic.css" rel="stylesheet" type="text/css" />
		<link href="assets/stylesheets/create.css" rel="stylesheet" type="text/css" />
		<link href="assets/stylesheets/facebook.css" rel="stylesheet" type="text/css" />
		<meta charset="UTF-8" />
		<script src="assets/javascript/jquery.js" type="text/javascript"></script>
		<script src="assets/javascript/modernizr.js" type="text/javascript"></script>
		<script src="assets/javascript/debugger.js" type="text/javascript"></script>
		<script src="assets/javascript/compatibility.js" type="text/javascript"></script>
		<script src="assets/javascript/basic.js" type="text/javascript"></script>
<?php
	if ($user)
	{
		echo "		<script type=\"text/javascript\">\n";
		echo "			$(document).ready\n";
		echo "			(\n";
		echo "				function()\n";
		echo "				// main method\n";
		echo "				{\n";
		echo "					var largeText = document.getElementById(\"largeText\");\n";
		echo "					var joinButton = document.getElementById(\"joinButton\");\n";
		echo "					var compatibilityImage = document.getElementById(\"compatibilityImage\");\n";
		echo "					var compatRight = document.getElementById(\"compatRight\");\n";
		echo "					if (compatibilityTest())\n";
		echo "					// browser is compatible with everything we need. this method exists in the\n";
		echo "					// modernizr.js file\n";
		echo "					{\n";
		echo "						largeText.innerHTML = \"Your browser is compatible with WePaint! Click the button below to join your friends.\";\n";
		echo "						joinButton.innerHTML = \"<form action=\\\"wepaint.php\\\" method=\\\"post\\\"><input name=\\\"game\\\" type=\\\"hidden\\\" value=\\\"" . $_GET["game"] . "\\\" /><input class=\\\"noBorder\\\" id=\\\"joinTheGame\\\" onmouseout=\\\"imgMouseOff('buttons', 'joinTheGame')\\\" onmouseover=\\\"imgMouseOn('buttons', 'joinTheGame')\\\" src=\\\"images/buttons/joinTheGame.png\\\" type=\\\"image\\\" /></form>\";\n";
		echo "					}\n";
		echo "					else\n";
		echo "					// browser is not compatible with everything we need\n";
		echo "					{\n";
		echo "						largeText.innerHTML = \"Your browser is not compatible with WePaint! You will not be able to play until you update to a modern browser such as <a href=\\\"http://www.google.com/chrome\\\" target=\\\"_blank\\\">Google Chrome</a>, <a href=\\\"http://windows.microsoft.com/en-US/internet-explorer/products/ie/home\\\" target=\\\"_blank\\\">Internet Explorer 9</a>, or <a href=\\\"http://www.firefox.com/\\\" target=\\\"_blank\\\">Mozilla Firefox</a>.\";\n";
		echo "						joinButton.innerHTML = \"<img src=\\\"images/emoticons/face06-64.png\\\" />\";\n";
		echo "					}\n";
		echo "				}\n";
		echo "			);\n";
		echo "		</script>\n";
		echo "		<title>Create a Game ~ WePaint.us</title>\n";
		echo "	</head>\n";
		echo "	<body>\n";
		echo "		<div id=\"fb-root\"></div>\n";
		echo "		<div id=\"header\">\n";
		echo "			<img src=\"images/wepaint.png\" alt=\"WePaint.us\" />\n";
		echo "			<img src=\"images/nav/divider.png\" />\n";
		echo "			<img src=\"images/nav/spacer.png\" />\n";
		echo "			<a href=\"about.html\">\n";
		echo "				<img src=\"images/nav/about.png\" alt=\"About\" class=\"noBorder\" id=\"about\" onmouseout=\"imgMouseOff('nav', 'about')\" onmouseover=\"imgMouseOn('nav', 'about')\" />\n";
		echo "			</a>\n";
		echo "		</div>\n";
		echo "		<div id=\"contentLite\">\n";
		echo "			<h2 class=\"simpleCenter\" id=\"largeText\"></h2>\n";
		echo "			<div id=\"joinButton\" style=\"text-align: center;\"></div>\n";
		echo "		</div>\n";
	}
	else
	{
		echo "		<title>Enter a Game ~ WePaint.us</title>\n";
		echo "	</head>\n";
		echo "	<body>\n";
		echo "		<div id=\"fb-root\"></div>\n";
		echo "		<div id=\"header\">\n";
		echo "			<img src=\"images/wepaint.png\" alt=\"WePaint.us\" />\n";
		echo "			<img src=\"images/nav/divider.png\" />\n";
		echo "			<img src=\"images/nav/spacer.png\" />\n";
		echo "			<a href=\"about.html\">\n";
		echo "				<img src=\"images/nav/about.png\" alt=\"About\" class=\"noBorder\" id=\"about\" onmouseout=\"imgMouseOff('nav', 'about')\" onmouseover=\"imgMouseOn('nav', 'about')\" />\n";
		echo "			</a>\n";
		echo "		</div>\n";
		echo "		<div id=\"contentLite\">\n";
		echo "			<h2 class=\"simpleCenter\">You're almost ready to paint with your friends! Please login with Facebook below.</h2>\n";
		echo "			<div class=\"simpleCenter\"><a href=\"" . $loginUrl . "\"><img class=\"noBorder\" id=\"loginBig\" onmouseout=\"imgMouseOff('buttons', 'loginBig')\" onmouseover=\"imgMouseOn('buttons', 'loginBig')\" src=\"images/buttons/loginBig.png\" /></a></div>\n";
		echo "		</div>\n";
	}
?>

		<div id="fbookLike">
			<div class="fb-like" data-href="http://www.wepaint.us/" data-send="false" data-width="450" data-show-faces="false"></div>
		</div>

		<script src="http://connect.facebook.net/en_US/all.js" type="text/javascript"></script>
		<script src="assets/javascript/facebook.js" type="text/javascript"></script>
	</body>

</html>


<!--
	Team Jiminy Cricket
-->