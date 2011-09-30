<?php


	include("facebookInit.php");


?>


<!doctype html>
<html lang="en">

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
				<div class="bottomBorder" id="currentWord">
					currentWord
				</div>
				<div class="bottomBorder" id="paintArea">
					<canvas id="paintCanvas" height="440" width="700"></canvas>
				</div>
				<div id="toolBox">
					<table cellpadding="2" cellspacing="2">
						<tr>
							<td><img src="images/paint/colors/black.png" alt="Black" /></td>
							<td><img src="images/paint/colors/grey.png" alt="Grey" /></td>
							<td><img src="images/paint/colors/maroon.png" alt="Maroon" /></td>
							<td><img src="images/paint/colors/red.png" alt="Red" /></td>
							<td><img src="images/paint/colors/orange.png" alt="Orange" /></td>
							<td><img src="images/paint/colors/yellow.png" alt="Yellow" /></td>
							<td><img src="images/paint/colors/green.png" alt="Green" /></td>
							<td><img src="images/paint/colors/lightBlue.png" alt="Light Blue" /></td>
							<td><img src="images/paint/colors/blue.png" alt="Blue" /></td>
							<td><img src="images/paint/colors/purple.png" alt="Purple" /></td>
							<td rowspan="2"><img src="images/paint/tools/brush/brush-64.png" alt="Brush Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/pencil/pencil-64.png" alt="Pencil Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/bucket/bucket-64.png" alt="Bucket Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/eraser/eraser-64.png" alt="Eraser Tool" /></td>
						</tr>
						<tr>
							<td><img src="images/paint/colors/white.png" alt="White" /></td>
							<td><img src="images/paint/colors/lightGrey.png" alt="Light Grey" /></td>
							<td><img src="images/paint/colors/brown.png" alt="Brown" /></td>
							<td><img src="images/paint/colors/pink.png" alt="Pink" /></td>
							<td><img src="images/paint/colors/yellowOrange.png" alt="Yellow Orange" /></td>
							<td><img src="images/paint/colors/tan.png" alt="Tan" /></td>
							<td><img src="images/paint/colors/yellowGreen.png" alt="Yellow Green" /></td>
							<td><img src="images/paint/colors/skyBlue.png" alt="Sky Blue" /></td>
							<td><img src="images/paint/colors/royalBlue.png" alt="Royal Blue" /></td>
							<td><img src="images/paint/colors/lightPurple.png" alt="Light Purple" /></td>
						</tr>
					</table>
				</div>
			</div>
			<div id="contentRight">
				<div class="bottomBorder" id="topicAndTime">
					topicAndTime
				</div>
				<div class="bottomBorder" id="whoIsPlaying">
					whoIsPlaying
				</div>
				<div class="bottomBorder" id="linkToInvite">
					linkToInvite
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
							<a href="#" onclick="fbPop()">
								<img src="images/buttons/fbLogin.png" alt="Login with Facebook" class="noBorder" id="fbLogin" onmouseout="imgMouseOff('buttons', 'fbLogin')" onmouseover="imgMouseOn('buttons', 'fbLogin')" />
							</a>
						</div>
						<div id="popUpContentBottomContentRight">
							<a href="#" onclick="popupFacebook('popUpFacebookDiv')"><img src="images/buttons/continue.png" class="noBorder" id="continue" onmouseout="imgMouseOff('buttons', 'continue')" onmouseover="imgMouseOn('buttons', 'continue')" /></a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="fb-root"></div>
		<script src="//connect.facebook.net/en_US/all.js" type="text/javascript"></script>
		<script src="facebook.js" type="text/javascript"></script>
	</body>

</html>


<!--
	Team Jiminy Cricket
-->