// Team Jiminy Cricket

function mainCanvasInit(canvasID)
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
	// canvas un-supported code here
	{
		
	}
}