// Team Jiminy Cricket

function randomBackground(inputID)
// Randomly picks a Jiminy Cricket image as the background image
// at the bottom right corner of the page.
{
	// the number of Jiminy images. They need to be named properly
	// for this to work. "logo1.jpg", "logo2.jpg", ...
	var imageCount = 3;

	document.getElementById(inputID).style.backgroundImage = "url(images/logo" + Math.floor((Math.random() * imageCount) + 1) + ".jpg)";
}