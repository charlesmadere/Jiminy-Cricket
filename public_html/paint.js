var canvas;
var canvasContext;
var currentTool;

// stores the user's current color
var currentColor = "null";

// stores the user's current tool
var currentTool = "null";

var currentDrawTool;
var drawColor = "null";
var drawTool = "null";


function paintCanvasInit()
// the "main method" for this file. this initializes our different paint
// tools and their settings.
{
	if (!Modernizr.canvas)
	// if the browser has canvas support return and do not run the
	// canvas code
	{
		return;
	}
	else
	{
		canvas = document.getElementById("paintCanvas");
		canvasContext = canvas.getContext("2d");

		var brush = new toolBrush();
		var pencil = new toolPencil();
		var bucket = new toolBucket();
		var eraser = new toolEraser();

		canvas.addEventListener("mousedown", canvasMouseEvent, false);
		canvas.addEventListener("mousemove", canvasMouseEvent, false);
		canvas.addEventListener("mouseup", canvasMouseEvent, false);
		canvas.addEventListener("mouseout", canvasMouseEvent, false);
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

	var func = currentDrawTool[e.type];
	if (func)
	{
		func(e);
	}
}


function toolBrush()
// 
{
	
}


function toolPencil()
// The function for the Pencil Tool.
{
	currentDrawTool = this;
	this.currentlyPainting = false;

	this.mousedown = function(e)
	// when the user clicks and holds it down in the paintArea
	// canvas
	{
		if (drawColor != "null")
		{
			currentDrawTool.currentlyPainting = true;
			canvasContext.beginPath();
			canvasContext.moveTo(e._x, (e._y - 64));
		}
	};

	this.mousemove = function(e)
	// when the user moves the cursor around in the paintArea
	// canvas
	{
		if (currentDrawTool.currentlyPainting)
		{
			canvasContext.lineTo(e._x, (e._y - 64));
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
		if (currentDrawTool.currentlyPainting)
		{
			currentDrawTool.currentlyPainting = false;
			currentDrawTool.mousemove(e);
		}
	};
}


function toolBucket()
// 
{
	
}


function toolEraser()
// 
{
	
}


function paintColorOnMouseOut(id)
// when the user's cursor is no longer on top of a color image
{
	if (currentColor != id)
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
	if (currentColor != id)
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
	if (currentColor != "null")
	{
		// change the old color's image src to the regular style image
		document.getElementById(currentColor).src = "images/paint/colors/" + currentColor + ".png";
	}

	currentColor = id;

	// change the id's image src to the active style image
	document.getElementById(currentColor).src = "images/paint/colors/" + currentColor + "-active.png";

	switch (currentColor)
	// change the current stroke color depending on which
	// color the user clicked on in the toolBox
	{
		case "colorBlack":
			drawColor = "#000000";
			break;

		case "colorGrey":
			drawColor = "#7F7F7F";
			break;

		case "colorMaroon":
			drawColor = "#880016";
			break;

		case "colorRed":
			drawColor = "#ED1B24";
			break;

		case "colorOrange":
			drawColor = "#FF7F26";
			break;

		case "colorYellow":
			drawColor = "#FEF200";
			break;

		case "colorGreen":
			drawColor = "#23B14D";
			break;

		case "colorLightBlue":
			drawColor = "#00A3E8";
			break;

		case "colorBlue":
			drawColor = "#3F47CC";
			break;

		case "colorPurple":
			drawColor = "#A349A3";
			break;

		case "colorWhite":
			drawColor = "#FFFFFF";
			break;

		case "colorLightGrey":
			drawColor = "#C3C3C3";
			break;

		case "colorBrown":
			drawColor = "#B97A57";
			break;

		case "colorPink":
			drawColor = "#FEAEC9";
			break;

		case "colorYellowOrange":
			drawColor = "#FFC90D";
			break;

		case "colorTan":
			drawColor = "#EFE3AF";
			break;

		case "colorYellowGreen":
			drawColor = "#B5E51D";
			break;

		case "colorSkyBlue":
			drawColor = "#9AD9EA";
			break;

		case "colorRoyalBlue":
			drawColor = "#7092BF";
			break;

		case "colorLightPurple":
			drawColor = "#C7BFE6";
			break;

		default:
			drawColor = "#000000";
			break;
	}

	canvasContext.strokeStyle = drawColor;
}


function paintToolOnMouseOut(id)
// when the user's cursor is no longer on top of a tool image
{
	if (currentTool != id)
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
	if (currentTool != id)
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
	if (currentTool != "null")
	// if the current tool is not the passed in id then we will
	// perform an onclick image change event
	{
		// change the id's image src to the regular style image
		document.getElementById(currentTool).src = "images/paint/tools/" + currentTool + ".png";
	}

	currentTool = id;

	// change the id's image src to the active style image
	document.getElementById(currentTool).src = "images/paint/tools/" + currentTool + "-active.png";

	switch (currentTool)
	// change the user's drawing tool depending on which tool
	// the user clicked on in the toolBox
	{
		case "toolPencil":
			drawTool = "toolPencil";
			break;

		case "toolBrush":
			drawTool = "toolBrush";
			break;

		case "toolBucket":
			drawTool = "toolBucket";
			break;

		case "toolEraser":
			drawTool = "toolEraser";
			break;

		default:
			drawTool = "toolPencil";
			break;
	}
}


// Team Jiminy Cricket