function imgMouseOn(folder, id)
// this function is used with the onmouseover tag.
// the id of the html tag must be passed to this function.
{
	document.getElementById(id).src = "../../images/" + folder + "/" + id + "-on.png";
}


function imgMouseOff(folder, id)
// this function is used with the onmouseout tag.
// the id of the html tag must be passed to this function.
{
	document.getElementById(id).src = "../../images/" + folder + "/" + id + ".png";
}


function aboutPage()
{
	window.open("about.html", "about", "menubar=no, width=800, height=400, toolbar=no");
}


function findEpoch()
{
	return Math.round((new Date()).getTime() / 1000);
}


function findBigEpoch()
{
	return Math.round((new Date()).getTime());
}


// Team Jiminy Cricket