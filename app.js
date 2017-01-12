
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,server=require('./routes/server')
  ,login=require('./routes/login')
  ,home=require('./routes/home')
  ,morgan=require('morgan'),
  bodyParser=require('body-parser')
  , session = require('client-sessions');
var app = express();
app.use(session({   
	  
	cookieName: 'session',    
	secret: 'cmpe273_test_string',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); 
// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(morgan('dev'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static('views'));
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/users', user.list);
app.post('/register', server.validation);
app.get('/homepage',home.home);
app.post('/login',login.login);
app.post('/logout',home.logout);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
