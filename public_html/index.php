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


?>


<!doctype html>
<html lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">

	<head>
		<link href="basic.css" rel="stylesheet" type="text/css" />
		<link href="facebook.css" rel="stylesheet" type="text/css" />
		<link href="paint.css" rel="stylesheet" type="text/css" />
		<meta charset="UTF-8" />
		<script src="modernizr.js" type="text/javascript"></script>
		<script src="debugger.js" type="text/javascript"></script>
		<script src="basic.js" type="text/javascript"></script>
		<script src="paint.js" type="text/javascript"></script>
		<script src="popup.js" type="text/javascript"></script>
		<script src="main.js" type="text/javascript"></script>
		<title>Index @ We Paint.us</title>
	</head>

	<body>
		<div id="fb-root"></div>
		<div id="header">
			<img src="images/wepaint.png" alt="WePaint.us" />
			<img src="images/nav/divider.png" />
			<img src="images/nav/spacer.png" />
			<!-- EXAMPLE LINK
			<a href="http://www.google.com/">
				<img src="images/nav/login.png" alt="Login with Facebook" class="noBorder" id="login" onmouseout="imgMouseOff('nav', 'login')" onmouseover="imgMouseOn('nav', 'login')" />
			</a>-->
		</div>
		<div id="content">
			<div id="contentLeft">
				<div class="bottomBorder" id="currentWordAndTimeLeft">
					currentWordAndTimeLeft
				</div>
				<div class="bottomBorder" id="paintArea">
					<canvas id="paintCanvas" height="470" width="700"></canvas>
				</div>
				<div id="toolBox">
					<table id="toolBoxTable">
						<tr>
							<td><img src="images/paint/colors/colorBlack.png" id="colorBlack" alt="Black" onmouseout="paintColorOnMouseOut('colorBlack')" onmouseover="paintColorOnMouseOver('colorBlack')" onclick="paintColorOnClick('colorBlack')" /></td>
							<td><img src="images/paint/colors/colorGrey.png" id="colorGrey" alt="Grey" onmouseout="paintColorOnMouseOut('colorGrey')" onmouseover="paintColorOnMouseOver('colorGrey')" onclick="paintColorOnClick('colorGrey')" /></td>
							<td><img src="images/paint/colors/colorMaroon.png" id="colorMaroon" alt="Maroon" onmouseout="paintColorOnMouseOut('colorMaroon')" onmouseover="paintColorOnMouseOver('colorMaroon')" onclick="paintColorOnClick('colorMaroon')" /></td>
							<td><img src="images/paint/colors/colorRed.png" id="colorRed" alt="Red" onmouseout="paintColorOnMouseOut('colorRed')" onmouseover="paintColorOnMouseOver('colorRed')" onclick="paintColorOnClick('colorRed')" /></td>
							<td><img src="images/paint/colors/colorOrange.png" id="colorOrange" alt="Orange" onmouseout="paintColorOnMouseOut('colorOrange')" onmouseover="paintColorOnMouseOver('colorOrange')" onclick="paintColorOnClick('colorOrange')" /></td>
							<td><img src="images/paint/colors/colorYellow.png" id="colorYellow" alt="Yellow" onmouseout="paintColorOnMouseOut('colorYellow')" onmouseover="paintColorOnMouseOver('colorYellow')" onclick="paintColorOnClick('colorYellow')" /></td>
							<td><img src="images/paint/colors/colorGreen.png" id="colorGreen" alt="Green" onmouseout="paintColorOnMouseOut('colorGreen')" onmouseover="paintColorOnMouseOver('colorGreen')" onclick="paintColorOnClick('colorGreen')" /></td>
							<td><img src="images/paint/colors/colorLightBlue.png" id="colorLightBlue" alt="Light Blue" onmouseout="paintColorOnMouseOut('colorLightBlue')" onmouseover="paintColorOnMouseOver('colorLightBlue')" onclick="paintColorOnClick('colorLightBlue')" /></td>
							<td><img src="images/paint/colors/colorBlue.png" id="colorBlue" alt="Blue" onmouseout="paintColorOnMouseOut('colorBlue')" onmouseover="paintColorOnMouseOver('colorBlue')" onclick="paintColorOnClick('colorBlue')" /></td>
							<td><img src="images/paint/colors/colorPurple.png" id="colorPurple" alt="Purple" onmouseout="paintColorOnMouseOut('colorPurple')" onmouseover="paintColorOnMouseOver('colorPurple')" onclick="paintColorOnClick('colorPurple')" /></td>
							<td rowspan="2"><img src="images/paint/tools/toolBrush.png" id="toolBrush" onmouseout="paintToolOnMouseOut('toolBrush')" onmouseover="paintToolOnMouseOver('toolBrush')" onclick="paintToolOnClick('toolBrush')" alt="Brush Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/toolPencil.png" id="toolPencil" onmouseout="paintToolOnMouseOut('toolPencil')" onmouseover="paintToolOnMouseOver('toolPencil')" onclick="paintToolOnClick('toolPencil')" alt="Pencil Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/toolBucket.png" id="toolBucket" onmouseout="paintToolOnMouseOut('toolBucket')" onmouseover="paintToolOnMouseOver('toolBucket')" onclick="paintToolOnClick('toolBucket')" alt="Bucket Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/toolEraser.png" id="toolEraser" onmouseout="paintToolOnMouseOut('toolEraser')" onmouseover="paintToolOnMouseOver('toolEraser')" onclick="paintToolOnClick('toolEraser')" alt="Eraser Tool" /></td>
						</tr>
						<tr>
							<td><img src="images/paint/colors/colorWhite.png" id="colorWhite" alt="White" onmouseout="paintColorOnMouseOut('colorWhite')" onmouseover="paintColorOnMouseOver('colorWhite')" onclick="paintColorOnClick('colorWhite')" /></td>
							<td><img src="images/paint/colors/colorLightGrey.png" id="colorLightGrey" alt="Light Grey" onmouseout="paintColorOnMouseOut('colorLightGrey')" onmouseover="paintColorOnMouseOver('colorLightGrey')" onclick="paintColorOnClick('colorLightGrey')" /></td>
							<td><img src="images/paint/colors/colorBrown.png" id="colorBrown" alt="Brown" onmouseout="paintColorOnMouseOut('colorBrown')" onmouseover="paintColorOnMouseOver('colorBrown')" onclick="paintColorOnClick('colorBrown')" /></td>
							<td><img src="images/paint/colors/colorPink.png" id="colorPink" alt="Pink" onmouseout="paintColorOnMouseOut('colorPink')" onmouseover="paintColorOnMouseOver('colorPink')" onclick="paintColorOnClick('colorPink')" /></td>
							<td><img src="images/paint/colors/colorYellowOrange.png" id="colorYellowOrange" alt="Yellow Orange" onmouseout="paintColorOnMouseOut('colorYellowOrange')" onmouseover="paintColorOnMouseOver('colorYellowOrange')" onclick="paintColorOnClick('colorYellowOrange')" /></td>
							<td><img src="images/paint/colors/colorTan.png" id="colorTan" alt="Tan" onmouseout="paintColorOnMouseOut('colorTan')" onmouseover="paintColorOnMouseOver('colorTan')" onclick="paintColorOnClick('colorTan')" /></td>
							<td><img src="images/paint/colors/colorYellowGreen.png" id="colorYellowGreen" alt="Yellow Green" onmouseout="paintColorOnMouseOut('colorYellowGreen')" onmouseover="paintColorOnMouseOver('colorYellowGreen')" onclick="paintColorOnClick('colorYellowGreen')" /></td>
							<td><img src="images/paint/colors/colorSkyBlue.png" id="colorSkyBlue" alt="Sky Blue" onmouseout="paintColorOnMouseOut('colorSkyBlue')" onmouseover="paintColorOnMouseOver('colorSkyBlue')" onclick="paintColorOnClick('colorSkyBlue')" /></td>
							<td><img src="images/paint/colors/colorRoyalBlue.png" id="colorRoyalBlue" alt="Royal Blue" onmouseout="paintColorOnMouseOut('colorRoyalBlue')" onmouseover="paintColorOnMouseOver('colorRoyalBlue')" onclick="paintColorOnClick('colorRoyalBlue')" /></td>
							<td><img src="images/paint/colors/colorLightPurple.png" id="colorLightPurple" alt="Light Purple" onmouseout="paintColorOnMouseOut('colorLightPurple')" onmouseover="paintColorOnMouseOver('colorLightPurple')" onclick="paintColorOnClick('colorLightPurple')" /></td>
						</tr>
					</table>
				</div>
			</div>
			<div id="contentRight">
				<div class="bottomBorder" id="currentTopic">
					currentTopic
				</div>
				<div class="bottomBorder" id="whoIsPlaying">
					whoIsPlaying
				</div>
				<div id="chatArea">
					chatArea
				</div>
			</div>
		</div>
		<div id="fbookLike">
			<div class="fb-like" data-href="http://www.wepaint.us/" data-send="false" data-width="450" data-show-faces="false"></div>
		</div>

		<div id="blanket" style="display: none;"></div>
		<div id="popUpFacebookDiv" style="display: none;">
		<!-- the code within this div is displayed only when the
		please login to facebook popup shows. -->
			<div id="popUpContent">
				<div id="popUpContentLeft">
					<img src="images/icons/inform/inform-128.png" />
				</div>
				<div id="popUpContentRight">
					<h2>You need to login to Facebook to use WePaint! Please connect your Facebook account to continue.</h2>
					<div class="error" id="errorFacebookDiv"></div>
				</div>
				<div id="popUpContentBottom">
					<div id="popUpContentBottomContent">
						<div id="fbookLogin">
							<fb:login-button></fb:login-button>
							<!--<a href="#" onclick="fbPop()">
								<img src="images/buttons/fbLogin.png" alt="Login with Facebook" class="noBorder" id="fbLogin" onmouseout="imgMouseOff('buttons', 'fbLogin')" onmouseover="imgMouseOn('buttons', 'fbLogin')" />
							</a>-->
						</div>
						<div id="popUpContentBottomContentRight">
							<a href="#" onclick="popupFacebook('popUpFacebookDiv')"><img src="images/buttons/continue.png" class="noBorder" id="continue" onmouseout="imgMouseOff('buttons', 'continue')" onmouseover="imgMouseOn('buttons', 'continue')" /></a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<script src="//connect.facebook.net/en_US/all.js" type="text/javascript"></script>
		<script src="facebook.js" type="text/javascript"></script>
	</body>

</html>


<!--
	Team Jiminy Cricket
-->