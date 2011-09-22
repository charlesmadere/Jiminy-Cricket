var isOpen = new Boolean();
isOpen = false;


function toggle(div_id)
// toggles the inserted div name from being displayed
// (display: block) to being hidden (display: none)
{
	var el = document.getElementById(div_id);

	if (el.style.display == 'none')
	{
		el.style.display = 'block';
	}
	else
	{
		el.style.display = 'none';
	}
}


function blanket_size(popUpDivVar)
// this resizes the blanket to fit the height of the page
// because there is no height = 100% attribute. This also
// centers the popup vertically
{
	if (typeof window.innerWidth != 'undefined')
	{
		viewportheight = window.innerHeight;
	}
	else
	{
		viewportheight = document.documentElement.clientHeight;
	}

	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight))
	{
		blanket_height = viewportheight;
	}
	else
	{
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight)
		{
			blanket_height = document.body.parentNode.clientHeight;
		}
		else
		{
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}

	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	var popUpDiv = document.getElementById(popUpDivVar);

	// 240 is half popup's height
	popUpDiv_height = blanket_height / 2 - 240;

	popUpDiv.style.top = popUpDiv_height + 'px';
}


function window_pos(popUpDivVar)
// this centers the popup vertically
{
	if (typeof window.innerWidth != 'undefined')
	{
		viewportwidth = window.innerHeight;
	}
	else
	{
		viewportwidth = document.documentElement.clientHeight;
	}

	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth))
	{
		window_width = viewportwidth;
	}
	else
	{
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth)
		{
			window_width = document.body.parentNode.clientWidth;
		}
		else
		{
			window_width = document.body.parentNode.scrollWidth;
		}
	}

	var popUpDiv = document.getElementById(popUpDivVar);

	// 320 is half popup's width
	window_width = window_width / 2 - 320;

	popUpDiv.style.left = window_width + 'px';
}


function popup(windowname)
// this function contains the above three to make life
// simple in the html file
{
	FB.getLoginStatus
	(
		function(response)
		{
			Debugger.log("response: " + response.authResponse);
			if (response.authResponse)
			// logged in and connected user, someone you know.
			// login popup is not shown
			{
				if (isOpen)
				{
					isOpen = false;
					blanket_size(windowname);
					window_pos(windowname);
					toggle('blanket');
					toggle(windowname);
				}
			}
			else
			// no user session available, someone you don't know
			{
				if (!isOpen)
				{
					isOpen = true;
					blanket_size(windowname);
					window_pos(windowname);
					toggle('blanket');
					toggle(windowname);
				}
				else
				// the user clicked continue but they are still
				// not logged into facebook
				{
					document.getElementById("errorDiv").innerHTML = "You are still not logged in to Facebook! You can't continue until you are fully logged in.";
				}
			}
		}
	);
}


// Team Jiminy Cricket