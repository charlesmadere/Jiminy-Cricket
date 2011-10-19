<?php


	function loadTopics($jsonTopicFile)
	{
		// 
		$jsonFile = file_get_contents($jsonTopicFile);

		// 
		$jsonIterator = new RecursiveIteratorIterator
		(
			new RecursiveArrayIterator(json_decode($jsonFile, true)),
			RecursiveIteratorIterator::SELF_FIRST
		);

		echo "<table border=\"1\">\n";
		foreach($jsonIterator as $key => $val)
		// 
		{
			echo "<tr>\n";
			if (is_array($val))
			{
				echo "<th colspan=\"2\">", $key, "</th>\n";
			}
			else
			{
				echo "<td>", $key, "</td>\n";
				echo "<td>", $val, "</td>\n";
			}
			echo "</tr>\n";
		}
		echo "</table>\n";
	}


	// Team Jiminy Cricket


?>