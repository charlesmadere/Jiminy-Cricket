<?php


	// make sure that all errors are reported
	error_reporting(E_ALL);

	// make sure that no browsers are caching requests
	header("Cache-Control: no-cache");


	if (!empty($_POST["game"]))
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


	if ($user)
	{
		$userInfo = $facebook->api("/$user");
	}


	// Team Jiminy Cricket


?>


<!doctype html>


<html lang="en">

	<head>
		<link href="assets/stylesheets/basic.css" rel="stylesheet" type="text/css" />
		<link href="assets/stylesheets/paint.css" rel="stylesheet" type="text/css" />
		<meta charset="UTF-8" />
		<script src="assets/javascript/jquery.js" type="text/javascript"></script>
		<script src="assets/javascript/modernizr.js" type="text/javascript"></script>
		<script src="assets/javascript/debugger.js" type="text/javascript"></script>
		<script src="assets/javascript/basic.js" type="text/javascript"></script>
		<script src="assets/javascript/paint.js" type="text/javascript"></script>
		<script src="assets/javascript/chat.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(document).ready
			(
				function()
				// main method
				{
					// initialize paint canvas settings
					paintCanvasInit();

					timestamp = 0;
					updateMsg();

					$("form#chatForm").submit
					(
						function()
						// 
						{
							// validate the user submitted text to ensure that it's
							// not exploitive
							var messageToSend = validateMessage(document.getElementById("msg").value);

							if (messageToSend)
							// the value of the input text field is both not blank and
							// not just filled with spaces
							{
								$.post
								(
									"chatBackend.php",
									{
										message: messageToSend,
										name: $("#author").val(),
										action: "postmsg",
										time: timestamp
									},
									function(xml)
									{
										$("#msg").empty();
										addMessages(xml);
									}
								);

								// clear the message text field so that the user can
								// begin typing another message without deleting their
								// previously entered text
								document.getElementById("msg").value = "";

								// scroll to the bottom of the chat window
								$("#chatArea").prop
								(
									{
										scrollTop: $("#chatArea").prop("scrollHeight")
									}
								);
							}

							return false;
						}
					);

					// scroll to the bottom of the chat window
					$("#chatArea").prop
					(
						{
							scrollTop: $("#chatArea").prop("scrollHeight")
						}
					);
				}
			);
		</script>
		<title>Let's Paint! ~ WePaint.us</title>
	</head>

	<body>
		<div id="fb-root"></div>
		<div id="header">
			<img src="images/wepaint.png" alt="WePaint.us" />
			<img src="images/nav/divider.png" />
			<img src="images/nav/spacer.png" />
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
							<td rowspan="2"><img src="images/paint/tools/toolPencil.png" id="toolPencil" onmouseout="paintToolOnMouseOut('toolPencil')" onmouseover="paintToolOnMouseOver('toolPencil')" onclick="paintToolOnClick('toolPencil')" alt="Pencil Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/toolBrush.png" id="toolBrush" onmouseout="paintToolOnMouseOut('toolBrush')" onmouseover="paintToolOnMouseOver('toolBrush')" onclick="paintToolOnClick('toolBrush')" alt="Brush Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/toolBucket.png" id="toolBucket" onmouseout="paintToolOnMouseOut('toolBucket')" onmouseover="paintToolOnMouseOver('toolBucket')" onclick="paintToolOnClick('toolBucket')" alt="Bucket Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/toolEraser.png" id="toolEraser" onmouseout="paintToolOnMouseOut('toolEraser')" onmouseover="paintToolOnMouseOver('toolEraser')" onclick="paintToolOnClick('toolEraser')" alt="Eraser Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/toolUndo.png" id="toolUndo" onmouseout="paintToolOnMouseOut('toolUndo')" onmouseover="paintToolOnMouseOver('toolUndo')" onclick="paintToolOnClick('toolUndo')" alt="Undo Tool" /></td>
							<td rowspan="2"><img src="images/paint/tools/toolNuke.png" id="toolNuke" onmouseout="paintToolOnMouseOut('toolNuke')" onmouseover="paintToolOnMouseOver('toolNuke')" onclick="paintToolOnClick('toolNuke')" alt="Nuke Tool" /></td>
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
					<span id="loading">Loading...</span>
				</div>
				<div id="chatAreaInput">
					<form id="chatForm">
						<input id="msg" maxlength="140" onclick="clearInput('msg')" size="20" type="text" value="Say hi!" />
					</form>
				</div>
			</div>
		</div>

		<script src="//connect.facebook.net/en_US/all.js" type="text/javascript"></script>
		<script src="assets/javascript/facebook.js" type="text/javascript"></script>
	</body>

</html>


<!--
	Team Jiminy Cricket
-->