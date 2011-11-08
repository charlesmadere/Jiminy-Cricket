window.fbAsyncInit = function()
{
	FB.init
	(
		{
			appId: '211936785535748',
			cookie: true,
			xfbml: true,
			oauth: true
		}
	);

	FB.Event.subscribe
	(
		'auth.logout', function(response)
		{
			//window.location.reload();
			Debugger.log("logged out");
		}
	);

	FB.Event.subscribe
	(
		'auth.login', function(response)
		{
			//window.location.reload();
			Debugger.log("logged in");
		}
	);
};
(
	function()
	{
			var e = document.createElement('script');
			e.async = true;
			e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
			document.getElementById('fb-root').appendChild(e);
	}
()
);


function streamPublish(name, description, hrefTitle, hrefLink, hrefPicture, userPrompt)
{
	FB.ui
	(
		{
			method: 'feed';
			message: userPrompt,
			link: hrefLink,
			caption: hrefTitle,
			picture: hrefPicture
		}
	);
}


function inviteFacebookFriends()
{
	var recieverUserIds = FB.ui
	(
		{
			method: 'apprequests',
			message: 'You\'ve been invited to play WePaint!',
		},
		function(receiverUserIds)
		{
			console.log("IDS : " + receiverUserIds.request_ids);
		}
	);
}


// Team Jiminy Cricket