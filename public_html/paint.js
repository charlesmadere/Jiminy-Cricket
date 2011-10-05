// stores the document.getElementById() for the paintCanvas
var canvas;

// stores the canvas.getContext("2d") for the paintCanvas
var canvasContext;

// stores the user's current color
var currentDrawColor = "null";
var previousDrawColor = "null";

// stores the user's current draw tool
var currentDrawTool = "null";
var previousDrawTool = "null";

// the Y axis offset for the drawing tool. This number
// is subtracted from the e._y variable in our mouse
// button listeners
var drawToolOffset = 49;

// stores the user's current draw tool function
var currentDrawToolFunction = "null";


function paintCanvasInit()
// the "main method" for this file. this initializes our different paint
// tools and their settings.
{
	if (Modernizr.canvas)
	// if the browser has canvas support continue running
	{
		canvas = document.getElementById("paintCanvas");
		canvasContext = canvas.getContext("2d");

		// clear the paintCanvas by placing a white rectangle on the
		// area of it
		clearPaintCanvas();

		canvas.addEventListener("mousedown", canvasMouseEvent, false);
		canvas.addEventListener("mousemove", canvasMouseEvent, false);
		canvas.addEventListener("mouseup", canvasMouseEvent, false);
		canvas.addEventListener("mouseout", canvasMouseEvent, false);
	}
	else
	// the user's browser does not have canvas support
	{
		
	}
}


function canvasMouseEvent(e)
// a generic event handler for the paintArea canvas. I'm not
// entirely sure of what this does.
{
	if (e.layerX || e.layerX == 0)
	{
		e._x = e.layerX;
		e._y = e.layerY;
	}
	else if (e.offsetX || e.offsetX == 0)
	{
		e._x = e.offsetX;
		e._y = e.offsetY;
	}

	if (currentDrawToolFunction != "null")
	// make sure that the user has actually chosen a tool to
	// draw with.
	{
		var func = currentDrawToolFunction[e.type];
		if (func)
		{
			func(e);
		}
	}
}


function toolBrush()
// The function for the Brush Tool on the paintArea toolbox.
// What is the Brush Tool? The Brush Tool is pretty much just
// another take on the pencil tool. It draws in a line following
// the user's cursor but it's considerably thicker than the
// Pencil Tool's line. The Brush Tool can have its color
// changed just like the Pencil Tool.
{
	currentDrawToolFunction = this;
	this.currentlyPainting = false;

	canvasContext.lineWidth = 6;

	this.mousedown = function(e)
	// when the user clicks and holds it down in the paintArea
	// canvas
	{
		if (currentDrawColor != "null")
		{
			currentDrawToolFunction.currentlyPainting = true;
			canvasContext.beginPath();

			// the (e._y - X) on this line corrects for the
			// browser offsets
			canvasContext.moveTo(e._x, (e._y - drawToolOffset));
		}
	};

	this.mousemove = function(e)
	// when the user moves the cursor around in the paintArea
	// canvas
	{
		if (currentDrawToolFunction.currentlyPainting)
		{
			// the (e._y - X) on this line corrects for the
			// browser offsets
			canvasContext.lineTo(e._x, (e._y - drawToolOffset));
			canvasContext.stroke();
		}
	};

	/*this.mouseout = function(e)
	// when the mouse cursor leaves the paintArea canvas
	{
		currentDrawTool.currentlyPainting = false;
	};*/

	this.mouseup = function(e)
	// when the user releases the click in the paintArea canvas
	{
		if (currentDrawToolFunction.currentlyPainting)
		{
			currentDrawToolFunction.currentlyPainting = false;
			currentDrawToolFunction.mousemove(e);
		}
	};
}


function toolBucket()
// The function for the Bucket Tool on the paintArea toolbox.
// What is the Bucket Tool? The Bucket Tool is the most complex
// tool in our arsenal. It fills in a closed in area with the user's
// chosen color.
{
	currentDrawToolFunction = this;
	this.currentlyPainting = false;

	this.mousedown = function(e)
	// 
	{
		
	}

	this.mouseup = function(e)
	// 
	{
		
	}
}


function toolEraser()
// The function for the Eraser Tool on the paintArea toolbox.
{
	currentDrawToolFunction = this;
	this.currentlyPainting = false;

	canvasContext.lineWidth = 16;

	this.mousedown = function(e)
	// when the user clicks and holds it down in the paintArea
	// canvas
	{
		if (currentDrawColor != "null")
		{
			currentDrawToolFunction.currentlyPainting = true;
			canvasContext.beginPath();
			canvasContext.moveTo(e._x, (e._y - drawToolOffset));
		}
	};

	this.mousemove = function(e)
	// when the user moves the cursor around in the paintArea
	// canvas
	{
		if (currentDrawToolFunction.currentlyPainting)
		{
			canvasContext.lineTo(e._x, (e._y - drawToolOffset));
			canvasContext.stroke();
		}
	};

	/*this.mouseout = function(e)
	// when the mouse cursor leaves the paintArea canvas
	{
		currentDrawTool.currentlyPainting = false;
	};*/

	this.mouseup = function(e)
	// when the user releases the click in the paintArea canvas
	{
		if (currentDrawToolFunction.currentlyPainting)
		{
			currentDrawToolFunction.currentlyPainting = false;
			currentDrawToolFunction.mousemove(e);
		}
	};
}


function toolPencil()
// The function for the Pencil Tool on the paintArea toolbox.
// What is the Pencil Tool? The Pencil Tool is the simplest
// drawing tool that we offer. It draws a very thin line
// following the user's cursor. It can have its color changed.
{
	currentDrawToolFunction = this;
	this.currentlyPainting = false;

	canvasContext.lineWidth = 1;

	this.mousedown = function(e)
	// when the user clicks and holds it down in the paintArea
	// canvas
	{
		if (currentDrawColor != "null")
		{
			currentDrawToolFunction.currentlyPainting = true;
			canvasContext.beginPath();
			canvasContext.moveTo(e._x, (e._y - drawToolOffset));
		}
	};

	this.mousemove = function(e)
	// when the user moves the cursor around in the paintArea
	// canvas
	{
		if (currentDrawToolFunction.currentlyPainting)
		{
			canvasContext.lineTo(e._x, (e._y - drawToolOffset));
			canvasContext.stroke();
		}
	};

	/*this.mouseout = function(e)
	// when the mouse cursor leaves the paintArea canvas
	{
		currentDrawTool.currentlyPainting = false;
	};*/

	this.mouseup = function(e)
	// when the user releases the click in the paintArea canvas
	{
		if (currentDrawToolFunction.currentlyPainting)
		{
			currentDrawToolFunction.currentlyPainting = false;
			currentDrawToolFunction.mousemove(e);
		}
	};
}


function clearPaintCanvas()
// clear the paintCanvas by placing a big white rectangle
// across the entire area of it
{
	canvasContext.fillStyle = "#FFFFFF";

	// 700 is the width of our canvas and 470 is the height
	canvasContext.fillRect(0, 0, 700, 470);
}


function paintColorOnMouseOut(id)
// when the user's cursor is no longer on top of a color image
{
	if (currentDrawColor != id)
	// if the current color is not the passed in id then we will
	// perform an onmouseout image change event
	{
		// change the id's image src
		document.getElementById(id).src = "images/paint/colors/" + id + ".png";
	}
}


function paintColorOnMouseOver(id)
// when the user's cursor is on top of a color image
{
	if (currentDrawColor != id)
	// if the current color is not the passed in id then we will
	// perform an onmouseover image change event
	{
		// change the id's image src
		document.getElementById(id).src = "images/paint/colors/" + id + "-on.png";
	}
}


function paintColorOnClick(id)
// when the user clicks on a color image
{
	if (currentDrawColor != "null")
	{
		previousDrawColor = currentDrawColor;

		// change the old color's image src to the regular style image
		document.getElementById(currentDrawColor).src = "images/paint/colors/" + currentDrawColor + ".png";
	}

	currentDrawColor = id;

	// change the id's image src to the active style image
	document.getElementById(currentDrawColor).src = "images/paint/colors/" + currentDrawColor + "-active.png";

	if (currentDrawTool == "null")
	// if the user chose a color but has not yet chosen a tool
	{
		// set their drawing tool to the pencil for them
		paintToolOnClick("toolPencil");
	}

	switch (currentDrawColor)
	// change the current stroke color depending on which
	// color the user clicked on in the toolBox. You can find
	// this color information in this word document on our 
	// github: /resources/website/paint/colors/colors.doc
	{
		case "colorBlack":
			canvasContext.strokeStyle = "#000000";
			break;

		case "colorGrey":
			canvasContext.strokeStyle = "#7F7F7F";
			break;

		case "colorMaroon":
			canvasContext.strokeStyle = "#880016";
			break;

		case "colorRed":
			canvasContext.strokeStyle = "#ED1B24";
			break;

		case "colorOrange":
			canvasContext.strokeStyle = "#FF7F26";
			break;

		case "colorYellow":
			canvasContext.strokeStyle = "#FEF200";
			break;

		case "colorGreen":
			canvasContext.strokeStyle = "#23B14D";
			break;

		case "colorLightBlue":
			canvasContext.strokeStyle = "#00A3E8";
			break;

		case "colorBlue":
			canvasContext.strokeStyle = "#3F47CC";
			break;

		case "colorPurple":
			canvasContext.strokeStyle = "#A349A3";
			break;

		case "colorWhite":
			canvasContext.strokeStyle = "#FFFFFF";
			break;

		case "colorLightGrey":
			canvasContext.strokeStyle = "#C3C3C3";
			break;

		case "colorBrown":
			canvasContext.strokeStyle = "#B97A57";
			break;

		case "colorPink":
			canvasContext.strokeStyle = "#FEAEC9";
			break;

		case "colorYellowOrange":
			canvasContext.strokeStyle = "#FFC90D";
			break;

		case "colorTan":
			canvasContext.strokeStyle = "#EFE3AF";
			break;

		case "colorYellowGreen":
			canvasContext.strokeStyle = "#B5E51D";
			break;

		case "colorSkyBlue":
			canvasContext.strokeStyle = "#9AD9EA";
			break;

		case "colorRoyalBlue":
			canvasContext.strokeStyle = "#7092BF";
			break;

		case "colorLightPurple":
			canvasContext.strokeStyle = "#C7BFE6";
			break;
	}
}


function paintToolOnMouseOut(id)
// when the user's cursor is no longer on top of a tool image
{
	if (currentDrawTool != id)
	// if the current tool is not the passed in id then we will
	// perform an onmouseout image change event
	{
		// change the id's image src
		document.getElementById(id).src = "images/paint/tools/" + id + ".png";
	}
}


function paintToolOnMouseOver(id)
// when the user's cursor is on top of a tool image
{
	if (currentDrawTool != id)
	// if the current tool is not the passed in id then we will
	// perform an onmouseover image change event
	{
		// change the id's image src
		document.getElementById(id).src = "images/paint/tools/" + id + "-on.png";
	}
}


function paintToolOnClick(id)
// when the user clicks on a tool image
{
	if (currentDrawTool != "null")
	// if the current tool is not the passed in id then we will
	// perform an onclick image change event
	{
		previousDrawTool = currentDrawTool;

		// change the id's image src to the regular style image
		document.getElementById(currentDrawTool).src = "images/paint/tools/" + currentDrawTool + ".png";
	}

	currentDrawTool = id;

	// change the id's image src to the active style image
	document.getElementById(currentDrawTool).src = "images/paint/tools/" + currentDrawTool + "-active.png";

	if (currentDrawTool != "toolEraser" && previousDrawTool == "toolEraser" && previousDrawColor != "null")
	// make it easier for the user to switch between tools by saving
	// user's last used color
	{
		paintColorOnClick(previousDrawColor);
	}

	if (currentDrawColor == "null")
	// if the user chose a tool but has not yet chosen a color
	{
		// set their drawing color to black for them
		paintColorOnClick("colorBlack");
	}

	switch (currentDrawTool)
	// change the user's drawing tool depending on which tool
	// the user clicked on in the toolBox
	{
		case "toolPencil":
			currentDrawToolFunction = new toolPencil();
			break;

		case "toolBrush":
			currentDrawToolFunction = new toolBrush();
			break;

		case "toolBucket":
			currentDrawToolFunction = new toolBucket();
			clearPaintCanvas();
			break;

		case "toolEraser":
			currentDrawToolFunction = new toolEraser();;
			paintColorOnClick("colorWhite");
			break;
	}
}


// Team Jiminy Cricket