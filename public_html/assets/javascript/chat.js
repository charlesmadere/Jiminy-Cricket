function validateMessage(message)
// performs a few regular expressions on a message and if everything
// checks out ok then true is returned
{
	if (/\S/.test(message))
	// check the string to ensure it's not just white space
	{
		// remove any whitespace at the beginning and end of the
		// message string
		message = jQuery.trim(message);

		// performs a global search on the message string and will
		// replace characters within the brackets with blank ("")
		message = message.replace(/\\|\`|\||\^|\~/g, "");

		// replace some special HTML characters with their code
		// counterparts so that the appearance of the page isn't
		// corrupted by bad user input
		message = message.replace(/\&/g, "&amp;");
		message = message.replace(/\"/g, "&quot;");
		message = message.replace(/\</g, "&lt;");
		message = message.replace(/\>/g, "&gt;");

		if (/\S/.test(message))
		// check again to ensure that the message actually contains
		// some characters
		{
			var tagOpening = "<img class=\"emot\" src=\"";
			var directory = "../images/emoticons/";
			var size = "20";
			var extension = ".png";
			var tagClosing = "\" />";

			var face00 = tagOpening + directory + "face00-" + size + extension + tagClosing;
			var face01 = tagOpening + directory + "face01-" + size + extension + tagClosing;
			var face02 = tagOpening + directory + "face02-" + size + extension + tagClosing;
			var face03 = tagOpening + directory + "face03-" + size + extension + tagClosing;
			var face04 = tagOpening + directory + "face04-" + size + extension + tagClosing;
			var face05 = tagOpening + directory + "face05-" + size + extension + tagClosing;
			var face06 = tagOpening + directory + "face06-" + size + extension + tagClosing;
			var face07 = tagOpening + directory + "face07-" + size + extension + tagClosing;
			var face08 = tagOpening + directory + "face08-" + size + extension + tagClosing;
			var face09 = tagOpening + directory + "face09-" + size + extension + tagClosing;
			var face10 = tagOpening + directory + "face10-" + size + extension + tagClosing;
			var face11 = tagOpening + directory + "face11-" + size + extension + tagClosing;
			var face12 = tagOpening + directory + "face12-" + size + extension + tagClosing;
			var face13 = tagOpening + directory + "face13-" + size + extension + tagClosing;
			var face14 = tagOpening + directory + "face14-" + size + extension + tagClosing;
			var face15 = tagOpening + directory + "face15-" + size + extension + tagClosing;
			var face16 = tagOpening + directory + "face16-" + size + extension + tagClosing;

			// face00: ":)"
			message = message.replace(/:\)/g, face00);

			// face01: ":D"
			message = message.replace(/:D/g, face01);

			// face02: ":("
			message = message.replace(/:\(/g, face02);

			// face03: ":3"
			message = message.replace(/:3/g, face03);

			// face04: ":o"
			message = message.replace(/:o/g, face04);

			// face05: ":O"
			message = message.replace(/:O/g, face05);

			// face06: ":x" and "x_x"
			message = message.replace(/:x|x_x/gi, face06);

			// face07: "XO"
			message = message.replace(/XO/g, face07);

			// face08: ":p"
			message = message.replace(/:p/gi, face08);

			// face09: ":v"
			message = message.replace(/:v/gi, face09);

			// face10: ";)"
			message = message.replace(/\;\)/g, face10);

			// face11: "joe"
			message = message.replace(/joe/gi, face11);

			// face12: "pao"
			message = message.replace(/pao/gi, face12);

			// face13: "pika"
			message = message.replace(/pika/gi, face13);

			// face14: "apple"
			message = message.replace(/apple/gi, face14);

			// face15: "boo" and "ghost"
			message = message.replace(/boo|ghost/gi, face15);

			// face16: "sonic" and "knuckles"
			message = message.replace(/sonic|knuckles/gi, face16);
			
			return message;
		}
		else
		// message contained nothing but possibly exploitive characters
		{
			return false;
		}
	}
	else
	// message was just blank or whitespace
	{
		return false;
	}
}


function addMessages(xml)
// 
{
	timestamp = $("time", xml).text();

	$("message", xml).each
	(
		function(id)
		// 
		{
			message = $("message", xml).get(id);
			$("#chatArea").append
			(
				"<p><span class=\"author\">" + $("author", message).text() + "</span> " + $("text", message).text() + "</p>"
			);
		}
	);

	// scroll to the bottom of the chat window
	$("#chatArea").scrollTop(1000);
}


function updateMsg()
// 
{
	$.post
	(
		"chatBackend.php",
		{
			time: timestamp
		},
		function(xml)
		// 
		{
			$("#loading").remove();
			addMessages(xml);
		}
	);

	// scroll to the bottom of the chat window
	$("#chatArea").scrollTop(1000);

	setTimeout('updateMsg()', 8000);
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