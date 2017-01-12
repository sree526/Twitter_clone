
var scotchApp = angular.module('scotchApp', ['ngRoute']);
	console.log('hi');
    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.ejs',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/login', {
                templateUrl : 'about.ejs',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/register', {
                templateUrl : 'contact.ejs',
                controller  : 'contactController'
            });
            
    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    scotchApp.controller("aboutController",function($scope,$http){
    	$scope.message = 'Login Page';
    	$scope.submit = function(){
    		console.log("here"); 				
    		var data = {email:$scope.email,password:$scope.password};
    		$http({
    			method:'post',
    			url:'/login',
    			data:data,
    			})
    		.success(function(res){
    			console.log(res);
    			if (res === "success") {
    				
    				window.location.assign("/homepage");
    				
    				}
    			else{
    				console.log('failure');
    					//Making a get call to the '/redirectToHomepage' API
    					
    			}
    		}).error(function(err){
    			console.log(err);
    			console.log('hi');
    		});
    	};
    });
    scotchApp.controller('contactController', function($scope,$http) {
        $scope.message = 'Contact us! JK. This is just a demo.';
        $scope.submit = function(){
			console.log("here");
			var config = {
				headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
				}
			};			
			//var data = {email:$scope.email,password:$scope.password};
			//var data = 'a='+$scope.a+'&b='+$scope.b;
			
			$http({
				method:'post',
				url:'/register',
				data:$scope.users,
				headers:{
                'Content-Type' : 'application/json'
				}})
			.success(function(res){
				console.log(res);
				if(res==="success"){
				$scope.register="Registration Successful";
				}
				else{
				$scope.register="Registration Failed";
				}
				}).error(function(err){
				console.log(err);
			});
        };
    });