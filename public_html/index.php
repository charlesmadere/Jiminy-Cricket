<?php


	error_reporting(E_ALL);


	require("facebook.php");

	$facebook = new Facebook
	(
		array
		(
			'appId' => '211936785535748',
			'secret' => '760f613bc10ba7bb970b3b4df4c1ff87',
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
		$logoutUrl = $facebook->getLogoutUrl();
	}
	else
	{
		$loginUrl = $facebook->getLoginUrl();
	}


	function findTopics()
	// this function scans the assets/topics/ directory for json files and then prints
	// those files to the HTML page in the form of a dropdown menu
	{
		
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
						<h3>Invite Your Friends!</h3>
						<?php if ($user): ?>
							<p><?php echo $user['name']; ?></p>
							<img src="https://graph.facebook.com/<?php echo $user; ?>/picture">
						<?php else: ?>
							<a href="<?php echo $loginUrl; ?>"><img class="noBorder" id="login" src="images/buttons/login.png" onmouseout="imgMouseOff('buttons', 'login')" onmouseover="imgMouseOn('buttons', 'login')" /></a>
						<?php endif ?>
					</div>
				</div>
				<div id="submitSettings">
					<input class="noBorder" id="submit" onmouseout="imgMouseOff('buttons', 'submit')" onmouseover="imgMouseOn('buttons', 'submit')" src="images/buttons/submit.png" type="image" />
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