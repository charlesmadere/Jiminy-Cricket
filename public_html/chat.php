<?php


	


?>


<!doctype html>
<html lang="en">

	<head>
		<link href="basic.css" rel="stylesheet" type="text/css" />
		<link href="facebook.css" rel="stylesheet" type="text/css" />
		<link href="paint.css" rel="stylesheet" type="text/css" />
		<meta charset="UTF-8" />
		<script src="basic.js" type="text/javascript"></script>
		<script src="debugger.js" type="text/javascript"></script>
		<script src="facebook.js" type="text/javascript"></script>
		<script src="modernizr.js" type="text/javascript"></script>
		<script src="paint.js" type="text/javascript"></script>
		<script src="popup.js" type="text/javascript"></script>
		<title>Chat @ We Paint.us</title>
	</head>

	<body>
		<div id="header">
			<img src="images/wepaint.png" alt="WePaint.us" />
			<img src="images/nav/divider.png" />
			<img src="images/nav/spacer.png" />
			<a href="index.php">
				<img src="images/nav/canvas.png" alt="Canvas" class="noBorder" id="canvas" onmouseout="imgMouseOff('canvas')" onmouseover="imgMouseOn('canvas')" />
			</a>
			<img src="images/nav/spacer.png" />
			<a href="#" onclick="popup('popUpDiv')">
				<img src="images/nav/login.png" alt="Login with Facebook" class="noBorder" id="login" onmouseout="imgMouseOff('login')" onmouseover="imgMouseOn('login')" />
			</a>
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
					toolBox
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

		<div id="footer"></div>

		<div id="blanket" style="display: none;"></div>
		<div id="popUpDiv" style="display: none;">
		<!-- the code within this div is displayed only when the
		please login to facebook popup shows. -->
			<div id="popUpContent">
				<div id="popUpContentLeft">
					<img src="images/icons/inform/inform-128.png" />
				</div>
				<div id="popUpContentRight">
					<h2>You need to login to Facebook to use WePaint! Please connect your Facebook account below.</h2>
				</div>
				<div id="popUpContentBottom">
					<div id="fb-root"></div>
					<script src="http://connect.facebook.net/en_US/all.js"></script>
					<script>
						FB.init({ 
							appId:'YOUR_APP_ID', cookie:true, 
							status:true, xfbml:true 
						});
					</script>
					<fb:login-button>Login with Facebook</fb:login-button>
					<a href="#" onclick="popup('popUpDiv')">bottom</a>
				</div>
			</div>
		</div>

	</body>

</html>

<!--
	Team Jiminy Cricket
-->