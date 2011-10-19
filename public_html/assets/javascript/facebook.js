var facebookLoggedIn = false;


FB.init
({
	// our AppID
	appId: '211936785535748',

	// check login status
	status: true,

	// enable cookies to allow the server to access
	// the session
	cookie: true,

	// parse XFBML
	xfbml: true,

	// channel.html file
	channelURL: 'http://www.wepaint.us/channel.html',

	// enable OAuth 2.0
	oauth: true
});


FB.getLoginStatus(function(response)
{
	if (response.authResponse)
	// user is logged in
	{
		facebookLoggedIn = true;
	}
	else
	// user is not logged in
	{
		facebookLoggedIn = false;
	}

	// run the main method
	main();
});


FB.Event.subscribe('auth.login', function(response)
{
	facebookLoggedIn = true;
});


FB.Event.subscribe('auth.logout', function(response)
{
	facebookLoggedIn = false;
});


// Team Jiminy Cricket