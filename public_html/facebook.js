window.fbAsyncInit = function()
{
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
};


(function(d)
{
	var js, id = 'facebook-jssdk';

	if (d.getElementById(id))
	{
		return;
	}

	js = d.createElement('script');
	js.id = id;
	js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	d.getElementsByTagName('head')[0].appendChild(js);
}(document));


// Team Jiminy Cricket