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
		$("#chatArea").prepend("<b>" + $("author", message).text() + "</b>: " + $("text", message).text() + "<br />");
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