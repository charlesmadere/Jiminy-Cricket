<?php


	


?>


<!DOCTYPE html>
<html lang="en">

	<head>
		<link href="basic.css" rel="stylesheet" type="text/css" />
		<link href="facebook.css" rel="stylesheet" type="text/css" />
		<link href="paint.css" rel="stylesheet" type="text/css" />
		<meta charset="UTF-8" />
		<script src="basic.js" type="text/javascript"></script>
		<script src="paint.js" type="text/javascript"></script>
		<title>Chat @ We Paint.us</title>
	</head>

	<body onload="paintCanvasStart('paintCanvas')">
		<div id="header">
			<img src="images/wepaint.png" alt="WePaint.us" />
			<img src="images/nav/divider.png" />
			<img src="images/nav/spacer.png" />
			<a href="index.php"><img src="images/nav/canvas.png" alt="Canvas" class="noBorder" id="canvas" onmouseout="imgMouseOff('canvas')" onmouseover="imgMouseOn('canvas')" /></a>
			<span id="fb-root"></span>
			<script>
				(function(d, s, id)
				{
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {return;}
					js = d.createElement(s); js.id = id;
					js.src = "//connect.facebook.net/en_US/all.js#appId=211936785535748&xfbml=1";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			</script>

		<div class="fb-login-button" data-show-faces="true" data-width="200" data-max-rows="1"></div>
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
	</body>

</html>

<!--
	Team Jiminy Cricket
-->