var canvas;
var canvasContext;
var currentTool;

// stores the user's current color
var currentColor = "null";

// stores the user's current tool
var currentTool = "null";


function paintCanvasInit()
// the "main method" for this file. this initializes our different paint
// tools and their settings.
{
	if (Modernizr.canvas)
	// if the browser has canvas support. continue running this javascript
	// like normal
	{
		canvas = document.getElementById("paintCanvas");
		canvasContext = canvas.getContext("2d");

		tool = new toolPencil();

		canvas.addEventListener("mousedown", canvasMouseEvent, false);
		canvas.addEventListener("mousemove", canvasMouseEvent, false);
		canvas.addEventListener("mouseup", canvasMouseEvent, false);
		canvas.addEventListener("mouseout", canvasMouseEvent, false);
	}
	else
	// the browser does not have canvas support. none of this javascript
	// will run.
	{
		return;
	}
}


function toolBrush()
// 
{
	
}


function toolPencil()
// The function for the Pencil Tool.
{
	pencil = this;
	this.currentlyPainting = false;

	/*this.mouseout = function(e)
	// when the mouse cursor leaves the paintArea canvas
	{
		pencil.currentlyPainting = false;
	};*/

	this.mousedown = function(e)
	// when the user clicks and holds it down in the paintArea
	// canvas
	{
		pencil.currentlyPainting = true;
		canvasContext.beginPath();
		canvasContext.moveTo(e._x, (e._y - 64));
	};

	this.mousemove = function(e)
	// when the user moves the cursor around in the paintArea
	// canvas
	{
		if (pencil.currentlyPainting)
		{
			canvasContext.lineTo(e._x, (e._y - 64));
			canvasContext.stroke();
		}
	};

	this.mouseup = function(e)
	// when the user releases the click in the paintArea canvas
	{
		if (pencil.currentlyPainting)
		{
			pencil.currentlyPainting = false;
			pencil.mousemove(e);
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

	var func = currentTool[e.type];
	if (func)
	{
		func(e);
	}
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
}


// Team Jiminy Cricket