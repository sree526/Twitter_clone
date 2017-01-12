
module.exports.validation= function (req, res) {	
	var ejs=require('ejs');
	var mysql      = require('mysql');
	var bcrypt   = require('bcrypt-nodejs');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'Sreek@r26',
	  database : 'test',
	  //port     : '3000'
	});
	connection.connect(function(err) {
		  console.log(err);
		});
	console.log('connection established');
	var email=req.body.email;
	var firstname=req.body.firstname;
	var lastname=req.body.lastname;
	var hash=bcrypt.hash(req.body.password,null,null,function(err,hash){
		if(err){
			console.log(err);
			}
		else{
		var query= connection.query("insert into test1(firstname,lastname,email,password)values" +
                "('"+(req.param('firstname'))+"',"+"'"+req.param('lastname')+"','"+req.param('email')+"','"+
                hash+"')",function(errs,result){
		console.log(query.sql);
		if(errs){
			console.log(errs);
			console.log("email already exists");
		res.send("failure");
		}
		else{
				res.send("success");
		console.log(req.body);
		}
		});
		}
	});
//	/res.send(JSON.stringify(email+''+password));
	//res.render('registers.ejs');
	
//console.log(val);
};
