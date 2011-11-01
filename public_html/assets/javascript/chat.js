function validateMessage(message)
// performs a few regular expressions on a message and if everything
// checks out ok then true is returned
{

	var directory = "../images/emoticons/";
	var size = "20";

	var face00 = directory + "face00-" + size + ".png";
	var face01 = directory + "face01-" + size + ".png";
	var face02 = directory + "face02-" + size + ".png";
	var face03 = directory + "face03-" + size + ".png";
	var face04 = directory + "face04-" + size + ".png";
	var face05 = directory + "face05-" + size + ".png";
	var face06 = directory + "face06-" + size + ".png";
	var face07 = directory + "face07-" + size + ".png";
	var face08 = directory + "face08-" + size + ".png";
	var face09 = directory + "face09-" + size + ".png";
	var face10 = directory + "face10-" + size + ".png";
	var face11 = directory + "face11-" + size + ".png";
	var face12 = directory + "face12-" + size + ".png";
	var face13 = directory + "face13-" + size + ".png";

	if (/\S/.test(message))
	// check the string to ensure it's not just white space
	{
		// performs a global search on the message string and will
		// replace characters within the brackets with blank ("")
		message = message.replace(/<|>|"|\\|`|\||\^|\~/g, "");

		if (/\S/.test(message))
		// check again for a message that's just whitespace
		{
			// face00: ":)"
			message = message.replace(/:\)/g, "<img src=" + face00 + " />");

			// face01: ":D"
			message = message.replace(/:D/g, "<img src=" + face01 + " />");

			// face02: ":("
			message = message.replace(/:\(/g, "<img src=" + face02 + " />");

			// face03: ":3"
			message = message.replace(/:3/g, "<img src=" + face03 + " />");

			// face04: ":o"
			message = message.replace(/:o/g, "<img src=" + face04 + " />");

			// face05: ":O"
			message = message.replace(/:O/g, "<img src=" + face05 + " />");

			// face06: ":x" and "x_x"
			message = message.replace(/:x|x_x/gi, "<img src=" + face06 + " />");

			// face07: "XO"
			message = message.replace(/D:/g, "<img src=" + face07 + " />");

			// face08: ":p"
			message = message.replace(/:p/gi, "<img src=" + face08 + " />");

			// face09: ":v"
			message = message.replace(/:v/gi, "<img src=" + face09 + " />");

			// face10: ";)"
			message = message.replace(/\;\)/g, "<img src=" + face10 + " />");

			// face11: ":joe:"
			message = message.replace(/:joe:/gi, "<img src=" + face11 + " />");

			// face12: ":pao:"
			message = message.replace(/:pao:/gi, "<img src=" + face12 + " />");

			// face13: ":pika:"
			message = message.replace(/:pika:/gi, "<img src=" + face13 + " />");
			
			return message;
		}
		else
		{
			return false;
		}
	}
	else
	// message is invalid!
	{
		return false;
	}
}


function addMessages(xml)
// 
{
	if ($("status", xml).text() == "2")
	// 
	{
		return;
	}

	timestamp = $("time", xml).text();

	$("message", xml).each(function(id)
	// 
	{
		message = $("message", xml).get(id);
		$("#chatArea").append("<b>" + $("author", message).text() + "</b>: " + $("text", message).text() + "<br />");
	});
}


function updateMsg()
// 
{
	$.post("server.php", { time: timestamp }, function(xml)
	// 
	{
		$("#loading").remove();
		addMessages(xml);
	});

	setTimeout('updateMsg()', 4000);
}


// has the user clicked in the text field yet? defaults to false
// because it hasn't been clicked yet
var formClicked = false;


function clearInput(id)
// the user clicked in the text field specified by id
{
	if (!formClicked)
	// the user has not yet clicked in the text field
	{
		// set the text field's value to blank. this will erase
		// the "Say hi!" message that is in there at first
		document.getElementById(id).value = "";
	}

	// the text field has been clicked on and has had its value
	// changed to blank so we can now set this variable to true
	formClicked = true;
}


// Team Jiminy Cricket