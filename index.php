<?php

	function printInfo()
	{
		print "This is some PHP.";
	}

?>
<!DOCTYPE html>
<!--
	that above line is required for every html5 file. don't leave it out!
-->
<html>

	<head>
		<link href="jiminy.css" rel="stylesheet" type="text/css" />
		<meta charset="UTF-8" />
		<script src="jiminy.js" type="text/javascript"></script>
		<title>Index @ Jiminy Cricket</title>
	</head>

	<body class="centeredpage" id="logo" onload="randomBackground('logo')">
		<div class="box">
			<div class="header">
				<h1>Jiminy Cricket</h1>
				<h2>A CMPS 401 HTML5 Team Project<h2>
			</div>
			<div class="content">
				<p><?php printStuff(); ?></p>
				<p>Hello, World!</p>
				<p><a href="https://www.youtube.com/watch?v=xdhLQCYQ-nQ" target="_blank">wat</a></p>
			</div>
		</div>
	</body>

</html>