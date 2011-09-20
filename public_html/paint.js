window.addEventListener("load", eventWindowLoaded, false);


function eventWindowLoaded()
{
	paintApp();
}


function canvasSupport()
{
	return Modernizr.canvas;
}


function paintApp()
// Draws the canvas. Drawing code for shapes and squares
// and other shit should go here.
{
	if (!canvasSupport())
	// check that the browser has Modernizr support. Modernizr
	// is a javascript library that checks browsers for HTML5
	// features. Basically this makes our web design job a lot
	// easier
	{
		return;
	}

	var canvas = document.getElementById("paintCanvas");
	var canvasContext = canvas.getContext("2d");

	// debugger test write
	Debugger.log("Drawing canvas...");

	function drawScreen()
	// drawing code goes in here!
	{
		canvasContext.fillStyle = "#000000";
		canvasContext.font = "32px _sans";
		canvasContext.textBaseline = "top";
		canvasContext.fillText("Hello, World!", 195, 80);
	}

	drawScreen();
}


// Team Jiminy Cricket