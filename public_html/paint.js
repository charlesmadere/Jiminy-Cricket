var canvas;
var canvasContext;
var currentTool;


function paintCanvasInit()
{
	if (!Modernizr.canvas)
	{
		return;
	}

	canvas = document.getElementById("paintCanvas");
	canvasContext = canvas.getContext("2d");

	tool = new toolPencil();

	canvas.addEventListener("mousedown", canvasMouseEvent, false);
	canvas.addEventListener("mousemove", canvasMouseEvent, false);
	canvas.addEventListener("mouseup", canvasMouseEvent, false);
}


function toolPencil()
{
	currentTool = this;
	this.currentlyPainting = false;

	this.mousedown = function(e)
	{
		canvasContext.beginPath();
		canvasContext.moveTo(e._x, (e._y - 64));
		currentTool.currentlyPainting = true;
	};

	this.mousemove = function(e)
	{
		if (currentTool.currentlyPainting)
		{
			canvasContext.lineTo(e._x, (e._y - 64));
			canvasContext.stroke();
		}
	};

	this.mouseup = function(e)
	{
		if (currentTool.currentlyPainting)
		{
			currentTool.mousemove(e);
			currentTool.currentlyPainting = false;
		}
	};
}


function canvasMouseEvent(e)
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


// Team Jiminy Cricket