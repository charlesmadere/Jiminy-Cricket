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

function randomBackground(inputID)
// Randomly picks a Jiminy Cricket image as the background image
// at the bottom right corner of the page.
{
	// the number of Jiminy images. They need to be named properly
	// for this to work. "logo1.jpg", "logo2.jpg", ...
	var imageCount = 3;

	document.getElementById(inputID).style.backgroundImage = "url(images/logo" + Math.floor((Math.random() * imageCount) + 1) + ".jpg)";
}


// Team Jiminy Cricket