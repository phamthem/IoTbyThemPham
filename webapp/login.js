var app = angular.module('loginModule', []);
app.controller('loginController', function($scope) {
    $scope.name = "John Doe";
    var account = {
      username : 'admin',
      password : 'admin'
    };
    $scope.validate = function(usern, pwd){
      if (usern === account.username && pwd === account.password  ) {
        window.location.href="/home.html"
        window.location.href="/index.html"
        return true;
      }
      return false;
    }

});
