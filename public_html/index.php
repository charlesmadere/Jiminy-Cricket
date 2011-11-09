<?php


	error_reporting(E_ALL);


	// facebook configuration settings
	$FB_APPID = "211936785535748";
	$FB_APPSECRET = "760f613bc10ba7bb970b3b4df4c1ff87";
	$FB_SCOPE = "email,publish_stream,user_about_me";
	$FB_REDIRECT = "http://www.wepaint.us/";

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


	function findTopics()
	// this function scans the assets/topics/ directory for json files and then prints
	// those files to the HTML page in the form of a dropdown menu
	{
		
	}


	function d($d)
	{
		echo "<pre>";
		print_r($d);
		echo "</pre>\n";
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
		<script type="text/javascript">
			$(document).ready(function()
			// main method
			{
				var compatibilityImage = document.getElementById("compatibilityImage");
				var compatRight = document.getElementById("compatRight");

				if (compatibilityTest())
				// browser is compatible with everything we need. this method exists in the
				// modernizr.js file
				{
					compatibilityImage.src = "../images/icons/accept-64.png";

					compatRight.innerHTML = "Your browser is 100% compatible with We Paint. Have fun!";
					compatRight.style.marginTop = "24px";
					compatRight.style.height = "64px";
					compatRight.setAttribute("class", "acceptWithoutBorders");
				}
				else
				// browser is not compatible with everything we need
				{
					compatibilityImage.src = "../images/icons/critical-64.png";

					compatRight.innerHTML = "Sorry, but your browser is not compatible with all of the HTML5 technologies that We Paint requires. You will not be able to play until you update to a modern browser such as <a href=\"http://www.google.com/chrome\" target=\"_blank\">Google Chrome</a>, <a href=\"http://windows.microsoft.com/en-US/internet-explorer/products/ie/home target=\"_blank\">Internet Explorer 9</a>, or <a href=\"http://www.firefox.com/\" target=\"_blank\">Mozilla Firefox</a>."
					compatRight.setAttribute("class", "errorWithoutBorders");
				}
			});
		</script>
		<title>Create A Game ~ WePaint.us</title>
	</head>

	<body>
		<div id="fb-root"></div>
		<div id="header">
			<img src="images/wepaint.png" alt="WePaint.us" />
			<img src="images/nav/divider.png" />
			<img src="images/nav/spacer.png" />
			<a href="about.html">
				<img src="images/nav/about.png" alt="About" class="noBorder" id="about" onmouseout="imgMouseOff('nav', 'about')" onmouseover="imgMouseOn('nav', 'about')" />
			</a>
		</div>
		<div id="contentLite">
<?php
	if ($user)
	{
		echo "			<h1 class=\"simpleCenter\">Create a game of We Paint!</h1>\n";
		echo "			<form action=\"wepaint.php\" id=\"settings\" method=\"post\">\n";
		echo "				<div id=\"settingsLeft\">\n";
		echo "					<div id=\"category\">\n";
		echo "						<h3>Choose a Category</h3>\n";
		echo "						<select name=\"category\">\n";

		findTopics();

		echo "							<option value=\"10\">temp</option>\n";
		echo "						</select>\n";
		echo "					</div>\n";
		echo "					<div id=\"time\">\n";
		echo "						<h3>Pick a Time Limit</h3>\n";
		echo "						<select name=\"time\">\n";
		echo "							<option value=\"30\">30 seconds</option>\n";
		echo "							<option value=\"45\">45 seconds</option>\n";
		echo "							<option value=\"60\">1 minute</option>\n";
		echo "							<option value=\"120\">2 minutes</option>\n";
		echo "							<option value=\"180\">3 minutes</option>\n";
		echo "							<option value=\"240\">4 minutes</option>\n";
		echo "							<option value=\"300\">5 minutes</option>\n";
		echo "							<option value=\"6000\">Derp</option>\n";
		echo "						</select>\n";
		echo "					</div>\n";
		echo "				</div>\n";
		echo "				<div id=\"settingsRight\">\n";
		echo "					<div id=\"inviteFriends\">\n";
		echo "						<h3>Hello, " . $userInfo['name'] . "!</h3>\n";

		// generate a hash using MD5 of the user's name and the system time. this
		// will be part of the query string
		$userHash = md5($userInfo['name'] . time());

		// build the link to print out into the html. this link will, when clicked,
		// call the streamPublish() javascript method in facebook.js. this javascript
		// method will create wall posts inviting the chosen friends to the game
		$queryString = "wepaint.php?game=" . $userHash;

		echo "						<a href=\"#\" onclick=\"streamPublish(" . $queryString . ")\"><img class=\"noBorder\" id=\"inviteYourFriends\" src=\"images/buttons/inviteYourFriends.png\" onmouseout=\"imgMouseOff('buttons', 'inviteYourFriends')\" onmouseover=\"imgMouseOn('buttons', 'inviteYourFriends')\" /></a>\n";
		echo "					</div>\n";
		echo "				</div>\n";
		echo "				<div id=\"submitSettings\">\n";
		echo "					<input class=\"noBorder\" id=\"letsPaint\" onmouseout=\"imgMouseOff('buttons', 'letsPaint')\" onmouseover=\"imgMouseOn('buttons', 'letsPaint')\" src=\"images/buttons/letsPaint.png\" type=\"image\" />\n";
		echo "				</div>\n";
		echo "			</form>\n";
	}
	else
	{
		echo "			<h1 class=\"simpleCenter\">Sign in with Facebook to play!</h3>\n";
		echo "			<div id=\"signInToFacebook\">\n";
		echo "				<a href=\"" . $loginUrl . "\"><img class=\"noBorder\" id=\"loginBig\" src=\"images/buttons/loginBig.png\" onmouseout=\"imgMouseOff('buttons', 'loginBig')\" onmouseover=\"imgMouseOn('buttons', 'loginBig')\" /></a>\n";
		echo "			</div>\n";
	}
?>
			<div id="compatLeft">
				<img id="compatibilityImage" />
			</div>
			<div id="compatRight"></div>
		</div>

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