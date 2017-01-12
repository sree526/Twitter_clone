/**
 * http://usejsdoc.org/
 */
exports.home = function(req,res)
{
	//Checks before redirecting whether the session is valid
	console.log('hi');
	console.log(req.session.email);
	if(req.session.email)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("registers",{username:req.session.email});
	}
	else
	{
		res.redirect('/');
	}
};


//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};