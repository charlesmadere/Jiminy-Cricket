function imgMouseOn(input)
// this function is used with the mouseover tag.
// the id of the tag must be passed to this function.
{
	document.getElementById(input).src = "images/nav/" + input + "-on.png";
}


function imgMouseOff(input)
// this function is used with the mouseout tag.
// the id of the tag must be passed to this function.
{
	document.getElementById(input).src = "images/nav/" + input + ".png";
}


// Team Jiminy Cricket