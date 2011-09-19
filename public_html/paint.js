function paintCanvasStart(canvasID)
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

		canvasContext.fillStyle = "rgba(0, 50, 200, 0.5)";
		canvasContext.fillRect(70, 50, 150, 200);

		canvasContext.fillStyle = "rgba(64, 128, 192, 0.75)";
		canvasContext.fillRect(200, 120, 170, 220);
	}
	else
	// canvas un-supported code here. I'm not sure exactly
	// what this is really for yet.
	{
		
	}
}


// Team Jiminy Cricket