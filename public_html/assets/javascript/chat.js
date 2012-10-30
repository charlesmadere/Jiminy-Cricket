// 
var MESSAGE_INPUT;

// 
var USERS_FACEBOOK_NAME;

// 
var GAME_ID;

// 
var POST_FILE_CHAT_INPUT = "chatInput.php";

// 
var POST_FILE_CHAT_OUTPUT = "chatOutput.php";

//
var lastMessageId = -1;

// 
var lastMessageTimeSubmit;

// 
var messageInputClicked = false;


var lastMessageUser = "";


var whoIsPlaying = new Array();

var CHAT_LOCAL_ONLY = false;


function chatInit(tempUsersFacebookName, tempGameId)
// 
{
	MESSAGE_INPUT = document.getElementById("msg");
	USERS_FACEBOOK_NAME = tempUsersFacebookName;
	GAME_ID = tempGameId;
	lastMessageId = -1;
	lastMessageTimeSubmit = findBigEpoch();

	if (testForEmptyString(tempUsersFacebookName) && testForEmptyString(tempGameId))
	{
		CHAT_LOCAL_ONLY = true;
		USERS_FACEBOOK_NAME = "WePaint";
		$("#loading").remove();
	}
	else
	{
		receiveMessages();
	}
}


function clearInput()
// the user clicked in the text field specified by id
{
	if (!messageInputClicked)
	// the user has not yet clicked in the text field
	{
		// set the text field's value to blank. this will erase
		// the "Say hi!" message that is in there at first
		MESSAGE_INPUT.value = "";
	}

	// the text field has been clicked on and has had its value
	// changed to blank so we can now set this variable to true
	messageInputClicked = true;
}


function receiveMessages()
// 
{
	// scroll to the bottom of the chat window
	$("#chatArea").scrollTop(10000);

	$.ajax
	(
		{
			type: "POST",
			url: POST_FILE_CHAT_OUTPUT,
			data:
			{
				game: GAME_ID,
				id: lastMessageId
			},
			success: function(data)
			{
				if (isNaN(data))
				{
					var AJAXReturn = jQuery.parseJSON(data);
					$("#loading").remove();

					for (var i in AJAXReturn)
					// 
					{
						lastMessageId = parseInt(AJAXReturn[i]["id"]);
						lastMessageUser = AJAXReturn[i]["user"];

						$("#chatArea").append
						(
							"<p><span class=\"author\">" + AJAXReturn[i]["user"] + "</span> " + AJAXReturn[i]["message"] + "</p>"
						);
						
						if (jQuery.inArray(lastMessageUser, whoIsPlaying) == -1)
						{
							whoIsPlaying.push(lastMessageUser);
							
							$("#whoIsPlaying").append
							(
									"<p><span class=\"author\">" + lastMessageUser + "</span> </p>"
							);
						}
						else
						{
							
						}
					}
				}
				else
				{
					lastMessageId = parseInt(data);
				}
			}
		}
	);

	// scroll to the bottom of the chat window
	$("#chatArea").scrollTop(10000);

	setTimeout("receiveMessages()", 1400);
}


function sendMessage()
// 
{
	if (findBigEpoch() - lastMessageTimeSubmit > 1000)
	{
		// scroll to the bottom of the chat window
		$("#chatArea").scrollTop(10000);

		var messageToSend = validateMessage(MESSAGE_INPUT.value);

		if (messageToSend)
		{
			lastMessageTimeSubmit = findBigEpoch();

			if (!CHAT_LOCAL_ONLY)
			{
				$.ajax
				(
					{
						type: "POST",
						url: POST_FILE_CHAT_INPUT,
						data:
						{
							user: USERS_FACEBOOK_NAME,
							message: messageToSend,
							game: GAME_ID
						},
						success: function(data)
						{
							// 
							lastMessageId = data;

							// clear the text input
							MESSAGE_INPUT.value = "";

							// scroll to the bottom of the chat window
							$("#chatArea").scrollTop(10000);
						}
					}
				);
			}
			else
			{
				// clear the text input
				MESSAGE_INPUT.value = "";

				$("#chatArea").append
				(
					"<p><span class=\"author\">" + USERS_FACEBOOK_NAME + "</span> " + messageToSend + "</p>"
				);
				
				if (jQuery.inArray(USERS_FACEBOOK_NAME, whoIsPlaying) == -1)
				{
					whoIsPlaying.push(USERS_FACEBOOK_NAME);
					
					$("#whoIsPlaying").append
					(
							"<p><span class=\"author\">" + USERS_FACEBOOK_NAME + "</span> </p>"
					);
				}
			}
		}
	}

	// scroll to the bottom of the chat window
	$("#chatArea").scrollTop(10000);

	return false;
}


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
			var directory = "images/emoticons/";
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
			var face17 = tagOpening + directory + "face17-" + size + extension + tagClosing;
			var face18 = tagOpening + directory + "face18-" + size + extension + tagClosing;
			var face19 = tagOpening + directory + "face19-" + size + extension + tagClosing;
			var face20 = tagOpening + directory + "face20-" + size + extension + tagClosing;
			var face21 = tagOpening + directory + "face21-" + size + extension + tagClosing;
			var face22 = tagOpening + directory + "face22-" + size + extension + tagClosing;
			var face23 = tagOpening + directory + "face23-" + size + extension + tagClosing;
			var face24 = tagOpening + directory + "face24-" + size + extension + tagClosing;
			var face25 = tagOpening + directory + "face25-" + size + extension + tagClosing;

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

			// face17: "brush"
			message = message.replace(/brush/gi, face17);

			// face18: "bucket"
			message = message.replace(/bucket/gi, face18);

			// face19: "eraser"
			message = message.replace(/eraser/gi, face19);

			// face20: "nuke"
			message = message.replace(/nuke/gi, face20);

			// face21: "pencil"
			message = message.replace(/pencil/gi, face21);

			// face22: "undo"
			message = message.replace(/undo/gi, face22);

			// face23: "charles"
			message = message.replace(/charles/gi, face23);

			// face24: "geo"
			message = message.replace(/geo/gi, face24);

			// face25: "jarrad"
			message = message.replace(/jarrad/gi, face25);
			
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


// Team Jiminy Cricket