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
		<p>
			<?php loadTopics("Animals.json"); ?>
		</p>
		<p>
			<?php loadTopics("SuperHeroes.json"); ?>
		</p>
		<p>
			<?php loadTopics("VideoGames.json"); ?>
		</p>
		 <p>
			<?php loadTopics("FamilyGuy.json"); ?>
		</p>	
		 <p>
			<?php loadTopics("DragonballZ.json"); ?>
		</p>
	</body>

</html>


<!--
	Team Jiminy Cricket
-->