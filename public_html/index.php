<?php


	require("facebook.php");

	$facebook = new Facebook(array
	(
		'appId' => '211936785535748',
		'secret' => '760f613bc10ba7bb970b3b4df4c1ff87',
	));

	// See if there is a user from a cookie
	$user = $facebook->getUser();

	if ($user)
	{
		try
		{
			// Proceed knowing you have a logged in user who's authenticated.
			$user_profile = $facebook->api("/me");
		}
		catch (FacebookApiException $e)
		{
			echo "<pre>" . htmlspecialchars(print_r($e, true)) . "</pre>";
			$user = null;
		}
	}


	// Team Jiminy Cricket


?>


<!doctype html>


<html lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">

	<head>
		<link href="assets/stylesheets/basic.css" rel="stylesheet" type="text/css" />
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
				// browser is compatible with everything we need
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

					compatRight.innerHTML = "Sorry, but your browser is not compatible with all of the HTML5 technologies that We Paint requires. You will not be able to play until you update to a modern browser such as <a href=\"http://www.google.com/chrome\" target=\"_blank\">Google Chrome</a> or <a href=\"http://www.firefox.com/\" target=\"_blank\">Mozilla Firefox</a>."
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
			<!-- the code to create a wepaint game goes here! -->
			<!--
				Charles: Geo, there is a bit of broken html in here. 
				<p/> is not a correct closing tag (there also are no
				<p> opening tags). And to be honest I'd maybe like a
				few more in between values like 45 seconds, 1 minute
				30 seconds... Times like that will probably prove
				to be the sweet spot of our application and therefore
				we may need a dropdown box instead of a radio list to
				squeeze in all of those options
			-->
			<h4>Select Draw Limit<h5>
			<form>
				<input type="radio" name= "drawLimit" value"30" checked/>30 Seconds<p/>
				<input type="radio" name= "drawLimit" value"60"/>1 Minute<p/>
				<input type="radio" name= "drawLimit" value"180"/>3 Minutes <p/>
				<input type="radio" name= "drawLimit" value"300"/>5 Minutes <p/>
				<input type="radio" name= "drawLimit" value"1200"/>My friends are "slow"</p>
			</form>
			<div id="compatLeft">
				<img id="compatibilityImage" />
			</div>
			<div id="compatRight"></div>
			<h3><a href="wepaint.php">Hello, Paint!</a></h3>
		</div>

		<div id="fbookLike">
			<div class="fb-like" data-href="http://www.wepaint.us/" data-send="false" data-width="450" data-show-faces="false"></div>
		</div>

		<script src="//connect.facebook.net/en_US/all.js" type="text/javascript"></script>
		<script src="assets/javascript/facebook.js" type="text/javascript"></script>
	</body>

</html>


<!--
	Team Jiminy Cricket
-->