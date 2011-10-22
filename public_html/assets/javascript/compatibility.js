function compatibilityTest()
// This method tests the browser for compatibility with all of the HTML5 features
// that we need for proper use of We Paint. We may need to add to or take away
// from the feature list below depending on what we change later in our
// development cycle.
{
	if (Modernizr.canvas && Modernizr.websockets && Modernizr.webworkers)
	// browser is compatible with everything we need
	{
		return true;
	}
	else
	// browser is not compatible with everything we need
	{
		return false;
	}
}


// Team Jiminy Cricket