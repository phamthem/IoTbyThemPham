	
angular.module('IoT', [
    'ngRoute',
    'mobile-angular-ui',
    'btford.socket-io'
    ])
.controller('login', function($scope, mySocket) {
	$scope.name = "John Doe";
		var account = {
		username : 'admin',
		password : 'admin'
		};
	$scope.validate = function(usern, pwd){
		if (usern === account.username && pwd === account.password  ) {
			window.location.href="/home.html"
			return true;
			}
		return false;
		}
});

	
	
