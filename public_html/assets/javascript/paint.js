// stores the document.getElementById() for the paintCanvas
var canvas;

// stores the canvas.getContext("2d") for the paintCanvas
var canvasContext;

// stores the user's current color as well as their
// previous one so that we can switch them back to it
// when they're done using the eraser tool
var currentDrawColor = "null";
var previousDrawColor = "null";

// stores the user's current draw tool as well as their
// previous one so that we can switch them back to it
// when they do a canvas clear or an undo
var currentDrawTool = "null";
var previousDrawTool = "null";

// stores the user's current draw tool function
var currentDrawToolFunction = "null";

// stores previous versions of the canvas for the undo
// button
var canvasUndoStates = new Array();

// the Y axis offset for the drawing tool. This number
// is subtracted from the e._y variable in our mouse
// button listeners
var DRAW_TOOL_OFFSET = 49;

// the height of the canvas (paintCanvas)
var CANVAS_HEIGHT = 470;

// the width of the canvas (paintCanvas)
var CANVAS_WIDTH = 700;


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
			canvasContext.moveTo(e._x, (e._y - DRAW_TOOL_OFFSET));

			// 
			addToUndo();
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
			canvasContext.lineTo(e._x, (e._y - DRAW_TOOL_OFFSET));
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

	// this will store the pixel data of the paintArea canvas
	var canvasContextImageData;

	// will store the RGBA color of the pixel that the user
	// originally clicked on
	var oldColorArray = new Array(4);

	// will store the RGBA color of the color that the user
	// has chosen to draw with
	var newColorArray = new Array(4);

	this.mousedown = function (e)
	// when the user clicks and holds it down in the paintArea
	// canvas
	{
		if (currentDrawColor != "null")
		// the user must have a drawing color currently selected in order
		// for us to actually draw anything!
		{

			// 
			addToUndo();

			// get the RGBA code for the color that the user wants to
			// use the fill tool with. The RGBA code is an array that
			// is 4 variables long. [0]: Red, [1]: Green, [2]: Blue,
			// [3]: Alpha
			newColorArray = getRGBACode(currentDrawColor);

			// get the x and y pixel locations of the cursor click. Do
			// modify these variables!
			var ORIGINAL_X_PIXEL = e._x;
			var ORIGINAL_Y_PIXEL = e._y - DRAW_TOOL_OFFSET;

			// get the exact cell that the user clicked on
			var ORIGINAL_CELL = (CANVAS_WIDTH * ORIGINAL_Y_PIXEL + ORIGINAL_X_PIXEL) * 4;

			// save the exact pixel data of the paintArea canvas
			canvasContextImageData = canvasContext.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			// the RGBA color of the exact pixel that the user clicked
			// on. This needs to be stored because later other pixels
			// will be compared to this one.
			oldColorArray[0] = canvasContextImageData.data[ORIGINAL_CELL];
			oldColorArray[1] = canvasContextImageData.data[ORIGINAL_CELL + 1];
			oldColorArray[2] = canvasContextImageData.data[ORIGINAL_CELL + 2];
			oldColorArray[3] = canvasContextImageData.data[ORIGINAL_CELL + 3];

			// initialize an array. This array will be used as a stack
			// so that we can do lots of pushes to it (add data to the
			// stack) and pops from it (take data away from the stack)
			var stack = new Array();

			// push the exact pixel coordinates that the user clicked
			// on onto the stack. Note how we push Y before X. This is
			// necessary because whenever you do stack.pop() the data
			// that you recieve will be the most recent thing pushed.
			// So if we do a stack.pop() right after these two lines
			// then what we will recieve is the value for
			// ORIGINAL_X_PIXEL
			stack.push(ORIGINAL_Y_PIXEL);
			stack.push(ORIGINAL_X_PIXEL);

			do
			// enter the main loop. This loop does a lot. see the
			// comments below for a description of what goes on line
			// by line. But basically it finds all adjacent pixels
			// of the same color that the user clicked on and changes
			// and changes them to the user selected color in the
			// process. This is NOT recursive. This is 100% my own code.
			{
				// retrieve the most coordinates most recently pushed
				// to the stack
				var x = stack.pop();
				var y = stack.pop();

				// figure out what cell we're going to be working with.
				// This is what position we are on in the array
				// canvasContextImageData.data
				var cell = (CANVAS_WIDTH * y + x) * 4;

				// apply the user selected color to the current cell
				applyNewColor(cell);

				// get the cell that is located directly above the
				// current one. This is exactly one pixel upwards
				cell = (CANVAS_WIDTH * (y - 1) + x) * 4;

				if (checkColorsForMatch(cell) && cell >= 0)
				// the cell is the color that we are replacing and
				// has an index of >= 0. This is important because
				// we can have a negative cell
				{
					stack.push(y - 1);
					stack.push(x);
				}

				// get the cell that is located directly left of
				// the current one. This is exactly one pixel to
				// the left.
				cell = (CANVAS_WIDTH * y + (x - 1)) * 4;

				if (checkColorsForMatch(cell) && cell >= 0)
				// the cell is the color that we are replacing and
				// has an index of >= 0. This is important because
				// we can have a negative cell
				{
					stack.push(y);
					stack.push(x - 1);
				}

				// get the cell that is located directly below the
				// current one. This is exactly one pixel down.
				cell = (CANVAS_WIDTH * (y + 1) + x) * 4;

				if (checkColorsForMatch(cell) && cell >= 0)
				// the cell is the color that we are replacing and
				// has an index of >= 0. This is important because
				// we can have a negative cell
				{
					stack.push(y + 1);
					stack.push(x);
				}

				// get the cell that is located directly right of
				// the current one. This is exactly one pixel to
				// the right.
				cell = (CANVAS_WIDTH * y + (x + 1)) * 4;

				if (checkColorsForMatch(cell) && cell >= 0)
				// the cell is the color that we are replacing and
				// has an index of >= 0. This is important because
				// we can have a negative cell
				{
					stack.push(y);
					stack.push(x + 1);
				}
			}
			// continue to loop as long as there are more than 0
			// elements in the stack
			while (stack.length);
		}

		// apply our changes to the paintArea canvas
		canvasContext.putImageData(canvasContextImageData, 0, 0);

		function checkColorsForMatch(cell)
		// compare the colors in oldColorArray to the colors in the current
		// cell. if they are equal this function will return true
		{
			if (oldColorArray[0] == canvasContextImageData.data[cell]
				&& oldColorArray[1] == canvasContextImageData.data[cell + 1]
				&& oldColorArray[2] == canvasContextImageData.data[cell + 2])
			// test to see if each array item is equal. Remember that
			// [0]: Red, [1]: Green, [2]: Blue, [3]: Alpha
			{
				return true;
			}
			else
			// the two arrays are not equal
			{
				return false;
			}
		}

		function applyNewColor(cell)
		// apply the user's current drawing color to the current cell
		{
			// the Red value
			canvasContextImageData.data[cell] = newColorArray[0];

			// the Green value
			canvasContextImageData.data[cell + 1] = newColorArray[1];

			// the Blue value
			canvasContextImageData.data[cell + 2] = newColorArray[2];

			// the Alpha value
			canvasContextImageData.data[cell + 3] = newColorArray[3];
		}
	}
}


function toolEraser()
// The function for the Eraser Tool on the paintArea toolbox.
{
	currentDrawToolFunction = this;
	this.currentlyPainting = false;

	canvasContext.lineWidth = 20;

	this.mousedown = function(e)
	// when the user clicks and holds it down in the paintArea
	// canvas
	{
		if (currentDrawColor != "null")
		{
			currentDrawToolFunction.currentlyPainting = true;
			canvasContext.beginPath();
			canvasContext.moveTo(e._x, (e._y - DRAW_TOOL_OFFSET));

			// 
			addToUndo();
		}
	};

	this.mousemove = function(e)
	// when the user moves the cursor around in the paintArea
	// canvas
	{
		if (currentDrawToolFunction.currentlyPainting)
		{
			canvasContext.lineTo(e._x, (e._y - DRAW_TOOL_OFFSET));
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
			canvasContext.moveTo(e._x, (e._y - DRAW_TOOL_OFFSET));

			// 
			addToUndo();
		}
	};

	this.mousemove = function(e)
	// when the user moves the cursor around in the paintArea
	// canvas
	{
		if (currentDrawToolFunction.currentlyPainting)
		{
			canvasContext.lineTo(e._x, (e._y - DRAW_TOOL_OFFSET));
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
	canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	// clear the undo states
	canvasUndoStates = [];
}


function addToUndo()
// add the current canvas state to our undo states
{
	if (canvasUndoStates.length == 4)
	// check to see if there are X undo states currently
	// saved. X is our maximum amount of undo states
	{
		// remove the element furthest down in the undo
		// states stack. this removes the oldest canvas
		// state
		canvasUndoStates.splice(0, 1);

		// push our newest canvas state onto the stack
		canvasUndoStates.push(canvasContext.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
	}
	else
	// there are less than X undo states currently
	// saved.
	{
		// push our newest canvas state onto the stack
		canvasUndoStates.push(canvasContext.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
	}
}


function paintColorOnMouseOut(id)
// when the user's cursor is no longer on top of a color image
{
	if (currentDrawColor != id)
	// if the current color is not the passed in id then we will
	// perform an onmouseout image change event
	{
		// change the id's image src
		document.getElementById(id).src = "../../images/paint/colors/" + id + ".png";
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
		document.getElementById(id).src = "../../images/paint/colors/" + id + "-on.png";
	}
}


function paintColorOnClick(id)
// when the user clicks on a color image
{
	if (currentDrawColor != "null")
	{
		previousDrawColor = currentDrawColor;

		// change the old color's image src to the regular style image
		document.getElementById(currentDrawColor).src = "../../images/paint/colors/" + currentDrawColor + ".png";
	}

	currentDrawColor = id;

	// change the id's image src to the active style image
	document.getElementById(currentDrawColor).src = "../../images/paint/colors/" + currentDrawColor + "-active.png";

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
		document.getElementById(id).src = "../../images/paint/tools/" + id + ".png";
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
		document.getElementById(id).src = "../../images/paint/tools/" + id + "-on.png";
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
		document.getElementById(currentDrawTool).src = "../../images/paint/tools/" + currentDrawTool + ".png";
	}

	currentDrawTool = id;

	// change the id's image src to the active style image
	document.getElementById(currentDrawTool).src = "../../images/paint/tools/" + currentDrawTool + "-active.png";

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
			break;

		case "toolEraser":
			currentDrawToolFunction = new toolEraser();;
			paintColorOnClick("colorWhite");
			break;
		
		case "toolUndo":
			// we don't want the undo tool to be a tool that can be
			// continuously used. It should just be clicked one and
			// then done with. This below code will immediately
			// switch the user back to the tool they used before the
			// undo tool. If they did not already use any tool then
			// the pencil tool will be automatically activated
			if (previousDrawTool != "null")
			{
				if (canvasUndoStates.length >= 1)
				// ensure that there are some undo states that we
				// can restore to
				{
					// restore the newest undo state onto the canvas
					canvasContext.putImageData(canvasUndoStates.pop(), 0, 0);
				}

				// restore the user's previously used tool
				paintToolOnClick(previousDrawTool);
			}
			else
			{
				// switch the user to the pencil tool
				paintToolOnClick("toolPencil");
			}

			break;

		case "toolNuke":
			// we don't want the nuke tool to be a tool that can be
			// continuously used. It should just be clicked once and
			// then done with. This below code will immediately
			// switch the user back to the tool they used before the
			// nuke tool. If they did not already use any tool then
			// the pencil tool will be automatically activated
			if (previousDrawTool != "null")
			{
				if (confirm("Are you sure you want to clear the canvas?"))
				// Ask the user if they're sure that they want to delete
				// the contents of the canvas by popping up a simple
				// "OK" or "Cancel" modal dialog. This if statement
				// should be inside of the above if statement because
				// if the previousDrawTool is in fact == "null" then
				// they haven't even drawn anything and therefore there
				// is no need to prompt them to clear the canvas
				{
					clearPaintCanvas();
				}

				// restore the user's previously used tool
				paintToolOnClick(previousDrawTool);
			}
			else
			{
				// switch the user to the pencil tool
				paintToolOnClick("toolPencil");
			}

			break;

		default:
			currentDrawToolFunction = new toolPencil();
			break;
	}
}


function getRGBACode(colorString)
// returns an array of 4 items that are the RGBA color for our
// colorString. You can find this color information in this
// word document on our github:
// /resources/website/paint/colors/colors.doc
{

	// array that will hold our R, G, B, and A colors
	// [0]: Red
	// [1]: Green
	// [2]: Blue
	// [3]: Alpha
	var RGBAArray = new Array(4);

	switch (currentDrawColor)
	// set the array to the RGBA color values.
	{
		case "colorBlack":
			RGBAArray[0] = 0;
			RGBAArray[1] = 0;
			RGBAArray[2] = 0;
			RGBAArray[3] = 255;
			break;

		case "colorGrey":
			RGBAArray[0] = 127;
			RGBAArray[1] = 127;
			RGBAArray[2] = 127;
			RGBAArray[3] = 255;
			break;

		case "colorMaroon":
			RGBAArray[0] = 136;
			RGBAArray[1] = 0;
			RGBAArray[2] = 21;
			RGBAArray[3] = 255;
			break;

		case "colorRed":
			RGBAArray[0] = 237;
			RGBAArray[1] = 28;
			RGBAArray[2] = 36;
			RGBAArray[3] = 255;
			break;

		case "colorOrange":
			RGBAArray[0] = 255;
			RGBAArray[1] = 127;
			RGBAArray[2] = 39;
			RGBAArray[3] = 255
			break;

		case "colorYellow":
			RGBAArray[0] = 255;
			RGBAArray[1] = 242;
			RGBAArray[2] = 0;
			RGBAArray[3] = 255;
			break;

		case "colorGreen":
			RGBAArray[0] = 34;
			RGBAArray[1] = 177;
			RGBAArray[2] = 76;
			RGBAArray[3] = 255;
			break;

		case "colorLightBlue":
			RGBAArray[0] = 0;
			RGBAArray[1] = 162;
			RGBAArray[2] = 232;
			RGBAArray[3] = 255;
			break;

		case "colorBlue":
			RGBAArray[0] = 63;
			RGBAArray[1] = 72;
			RGBAArray[2] = 204;
			RGBAArray[3] = 255;
			break;

		case "colorPurple":
			RGBAArray[0] = 163;
			RGBAArray[1] = 73;
			RGBAArray[2] = 164;
			RGBAArray[3] = 255;
			break;

		case "colorWhite":
			RGBAArray[0] = 255;
			RGBAArray[1] = 255;
			RGBAArray[2] = 255;
			RGBAArray[3] = 255;
			break;

		case "colorLightGrey":
			RGBAArray[0] = 195;
			RGBAArray[1] = 195;
			RGBAArray[2] = 195;
			RGBAArray[3] = 255;
			break;

		case "colorBrown":
			RGBAArray[0] = 185;
			RGBAArray[1] = 122;
			RGBAArray[2] = 87;
			RGBAArray[3] = 255;
			break;

		case "colorPink":
			RGBAArray[0] = 255;
			RGBAArray[1] = 174;
			RGBAArray[2] = 201;
			RGBAArray[3] = 255;
			break;

		case "colorYellowOrange":
			RGBAArray[0] = 255;
			RGBAArray[1] = 201;
			RGBAArray[2] = 14;
			RGBAArray[3] = 255;
			break;

		case "colorTan":
			RGBAArray[0] = 239;
			RGBAArray[1] = 228;
			RGBAArray[2] = 176;
			RGBAArray[3] = 255;
			break;

		case "colorYellowGreen":
			RGBAArray[0] = 181;
			RGBAArray[1] = 230;
			RGBAArray[2] = 29;
			RGBAArray[3] = 255;
			break;

		case "colorSkyBlue":
			RGBAArray[0] = 153;
			RGBAArray[1] = 217;
			RGBAArray[2] = 234;
			RGBAArray[3] = 255;
			break;

		case "colorRoyalBlue":
			RGBAArray[0] = 112;
			RGBAArray[1] = 146;
			RGBAArray[2] = 190;
			RGBAArray[3] = 255;
			break;

		case "colorLightPurple":
			RGBAArray[0] = 200;
			RGBAArray[1] = 191;
			RGBAArray[2] = 231;
			RGBAArray[3] = 255;
			break;

		default:
		// use black for an unknown color
			RGBAArray[0] = 0;
			RGBAArray[1] = 0;
			RGBAArray[2] = 0;
			RGBAArray[3] = 255;
			break;
	}

	return RGBAArray;
}


// Team Jiminy Cricket