
module.exports.login=function(req,res){
var mysql = require('mysql');
var bcrypt= require('bcrypt-nodejs');
var pool  = mysql.createPool(  {connectionLimit : 10,
		  host            : 'localhost',
		  user            : 'root',
		  password        : 'Sreek@r26',
		  database        : 'test'
			  });
pool.getConnection(function(err, connection) {
  // Use the connection 
	var email=req.body.email;
	var password=req.body.password;
	req.session.email=email;
	var hash= pool.query("select password from test1 where email='"+req.body.email+"'",function(err,results){
	if(err){
		console.log(err);
			}
	else	{
	var hash1=results[0].password;
	console.log(hash1);
	bcrypt.compare(password,hash1 , function(err, result1) {
	    // res == true
		if(err){
			console.log('password mismatch');
				}
		else{
	var query=pool.query( 'SELECT * FROM test1 where email=?',[email], function(err, result) {
    // And done with the connection. 
			console.log(err);
			console.log(result.length);
			if(result.length>0){
			//res.render('registers',{data:result});			
			console.log("login successful");
			res.send("success");		
		}		
		else{
		console.log('invalid login');			
		res.send('failure');
		}
	console.log(query.sql);
	  connection.release();	
	});	
		}
	});
	}// Don't use the connection here, it has been returned to the pool. 
  });
});
};