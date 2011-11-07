window.fbAsyncInit = function()
{
		FB.init
		(
			{
				appId: '211936785535748',
				cookie: true,
				xfbml: true,
				oauth: true
				channelURL: 'http://www.wepaint.us/channel.html',
			}
		);

		FB.Event.subscribe('auth.login', function(response)
			{
				window.location.reload();
			}
		);

        FB.Event.subscribe('auth.logout', function(response) {
          window.location.reload();
        });
};
(
	function()
	{
			var e = document.createElement('script'); e.async = true;
			e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
			document.getElementById('fb-root').appendChild(e);
	}()
);


// Team Jiminy Cricket