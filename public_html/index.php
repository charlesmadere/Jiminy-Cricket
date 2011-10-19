<?php


	require("facebook.php");

	$facebook = new Facebook(array
	(
		'appId' => '211936785535748',
		'secret' => '760f613bc10ba7bb970b3b4df4c1ff87',
	));

	// See if there is a user from a cookie
	$user = $facebook->getUser();

	/*if ($user)
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
	}*/


	// Team Jiminy Cricket


?>

<!doctype html>

<html lang="en">

	<head>
		<link href="assets/stylesheets/basic.css" rel="stylesheet" type="text/css" />
		<link href="assets/stylesheets/facebook.css" rel="stylesheet" type="text/css" />
		<meta charset="UTF-8" />
		<script src="assets/javascript/modernizr.js" type="text/javascript"></script>
		<script src="assets/javascript/debugger.js" type="text/javascript"></script>
		<script src="assets/javascript/basic.js" type="text/javascript"></script>
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
			<p><a href="wepaint.php">Hello, World!</a></p>
			<!-- the code to create a wepaint game goes here! -->
		</div>
	</body>

</html>


<!--
	Team Jiminy Cricket
-->