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
		Debugger.log("login");
		facebookLoggedIn = true;
	}
	else
	// user is not logged in
	{
		Debugger.log("logout");
		facebookLoggedIn = false;
	}

	// run the main method
	main();
});


FB.Event.subscribe('auth.login', function(response)
{
	Debugger.log("login");
	facebookLoggedIn = true;
});


FB.Event.subscribe('auth.logout', function(response)
{
	Debugger.log("logout");
	facebookLoggedIn = false;
});


function fbPop()
// pops up a window asking the user to login to facebook
{
	FB.login(function(response)
	{
		if (response.authResponse)
		{
			Debugger.log('Welcome! Fetching your information...');
			FB.api('/me', function(response)
			{
				Debugger.log('Good to see you, ' + response.name + '.');
				FB.logout(function(response)
				{
					Debugger.log('Logged out.');
				});
			});
		}
		else
		{
			Debugger.log('User cancelled login or did not fully authorize.');
		}
	},
	{
		scope: 'email'
	});
}


// Team Jiminy Cricket