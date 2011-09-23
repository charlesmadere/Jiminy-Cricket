<?php


	require("jsonLoad.php");


?>


<!doctype html>

<html lang="en">

	<head>
		<link href="../basic.css" rel="stylesheet" type="text/css" />
		<meta charset="UTF-8" />
		<title>jsonTest.php</title>
	</head>

	<body>
		<h1>Hello, World!</h1>
		<p>
			<?php loadTopics("Pokemon.json"); ?>
		</p>
		<p>
			<?php loadTopics("Goldeneye.json"); ?>
		</p>
		<p>
			<?php loadTopics("CartoonCharacters.json"); ?>
		</p>
	</body>

</html>


<!--
	Team Jiminy Cricket
-->