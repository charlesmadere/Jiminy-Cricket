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

        if (isset($_GET['publish'])){
            try {
                $publishStream = $facebook->api("/$user/feed", 'post', array(
                    'message' => "I love thinkdiff.net for facebook app development tutorials. :)", 
                    'link'    => 'http://ithinkdiff.net',
                    'picture' => 'http://thinkdiff.net/ithinkdiff.png',
                    'name'    => 'iOS Apps & Games',
                    'description'=> 'Checkout iOS apps and games from iThinkdiff.net. I found some of them are just awesome!'
                    )
                );
                //as $_GET['publish'] is set so remove it by redirecting user to the base url 
            } catch (FacebookApiException $e) {
                d($e);
            }
            $redirectUrl     = $fbconfig['baseurl'] . '/index.php?success=1';
            header("Location: $redirectUrl");
        }

        //update user's status using graph api
        //http://developers.facebook.com/docs/reference/dialogs/feed/
        if (isset($_POST['tt'])){
            try {
                $statusUpdate = $facebook->api("/$user/feed", 'post', array('message'=> $_POST['tt']));
            } catch (FacebookApiException $e) {
                d($e);
            }
        }

        //fql query example using legacy method call and passing parameter
        try{
            $fql    =   "select name, hometown_location, sex, pic_square from user where uid=" . $user;
            $param  =   array(
                'method'    => 'fql.query',
                'query'     => $fql,
                'callback'  => ''
            );
            $fqlResult   =   $facebook->api($param);
        }
        catch(Exception $o){
            d($o);
        }
	}


	function echoLoginOrLogout()
	{
		if ($user)
		{
			echo "<img src=\"https://graph.facebook.com/" . $user . "/picture\" />\n";
		}
		else
		{
			echo "<a href=\"" . $loginUrl . "\"><img class=\"noBorder\" id=\"login\" src=\"images/buttons/login.png\" onmouseout=\"imgMouseOff('buttons', 'login',)\" onmouseover=\"imgMouseOn('buttons', 'login')\" /></a>\n";
		}
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
			<h1 style="text-align: center;">Create a game of We Paint!</h1>
			<form action="wepaint.php" id="settings" method="post">
				<div id="settingsLeft">
					<div id="category">
						<h3>Choose a Category</h3>
						<select name="category">
							<?php findTopics(); ?>
							<option value="10">temp</option>
						</select>
					</div>

					<div id="time">
						<h3>Pick a Time Limit</h3>
						<select name="time">
							<option value="30">30 seconds</option>
							<option value="45">45 seconds</option>
							<option value="60">1 minute</option>
							<option value="120">2 minutes</option>
							<option value="180">3 minutes</option>
							<option value="240">4 minutes</option>
							<option value="300">5 minutes</option>
							<option value="6000">Derp</option>
						</select>
					</div>
				</div>
				<div id="settingsRight">
					<div id="inviteFriends">
						<?php
							if ($user)
							{
								echo "<h3>Hello, " . $userInfo['name'] . "!</h3>\n";
								echo "<a href=\"#\" onclick=\"inviteFacebookFriends()\"><img class=\"noBorder\" id=\"inviteYourFriends\" src=\"images/buttons/inviteYourFriends.png\" onmouseout=\"imgMouseOff('buttons', 'inviteYourFriends')\" onmouseover=\"imgMouseOn('buttons', 'inviteYourFriends')\" /></a>\n";
							}
							else
							{
								echo "<h3>Sign in with Facebook to play!</h3>\n";
								echo "<a href=\"" . $loginUrl . "\"><img class=\"noBorder\" id=\"login\" src=\"images/buttons/login.png\" onmouseout=\"imgMouseOff('buttons', 'login')\" onmouseover=\"imgMouseOn('buttons', 'login')\" /></a>\n";
							}
						?>
					</div>
				</div>
				<div id="submitSettings">
					<input class="noBorder" id="letsPaint" onmouseout="imgMouseOff('buttons', 'letsPaint')" onmouseover="imgMouseOn('buttons', 'letsPaint')" src="images/buttons/letsPaint.png" type="image" />
				</div>
			</form>
			<div id="compatLeft">
				<img id="compatibilityImage" />
			</div>
			<div id="compatRight"></div>
		</div>

		<div id="fbookLike">
			<div class="fb-like" data-href="http://www.wepaint.us/" data-send="false" data-width="450" data-show-faces="false"></div>
		</div>

		<h3><a href="wepaint.php">Hello, Paint!</a></h3>

		<script src="http://connect.facebook.net/en_US/all.js" type="text/javascript"></script>
		<script src="assets/javascript/facebook.js" type="text/javascript"></script>
	</body>

</html>


<!--
	Team Jiminy Cricket
-->