
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.sendfile("./views/index.html");
	//res.render('index', { title: 'Express' });
	res.render('index',{title:'login'});
};