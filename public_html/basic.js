function imgMouseOn(folder, id)
// this function is used with the onmouseover tag.
// the id of the html tag must be passed to this function.
{
	document.getElementById(id).src = "images/" + folder + "/" + id + "-on.png";
}


function imgMouseOff(folder, id)
// this function is used with the onmouseout tag.
// the id of the html tag must be passed to this function.
{
	document.getElementById(id).src = "images/" + folder + "/" + id + ".png";
}


// Team Jiminy Cricket