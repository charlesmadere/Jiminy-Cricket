function mainCanvasInit(canvasID)
// Draws the canvas. Drawing code for shapes and squares
// and other shit should go here.
{
	var canvas = document.getElementById(canvasID);

	if (canvas.getContext)
	// drawing code here
	{
		var canvasContext = canvas.getContext('2d');

		canvasContext.fillStyle = "rgb(200, 0, 0)";
		canvasContext.fillRect(10, 10, 55, 50);

		canvasContext.fillStyle = "rgba(0, 0, 200, 0.5)";
		canvasContext.fillRect(30, 30, 55, 50);
	}
	else
	// canvas un-supported code here. I'm not sure exactly
	// what this is really for yet.
	{
		
	}
}


function imgMouseOn(input)
// this function is used with the mouseover tag.
// the id of the tag must be passed to this function.
{
	document.getElementById(input).src = "images/nav/" + input + "-on.png";
}


function imgMouseOff(input)
// this function is used with the mouseout tag.
// the id of the tag must be passed to this function.
{
	document.getElementById(input).src = "images/nav/" + input + ".png";
}


// Team Jiminy Cricket