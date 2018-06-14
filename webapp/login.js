(function(){
 "use strict";
 angular.module("User.DangNhap.Ctrl",[])
  .controller("login", ["$scope", "$http", "MyAuth", "$location", function($scope, $http, MyAuth, $location) {
   $scope.checkLogin = function() {
    // call api for checking username/password
    var user = {
     username: $scope.username,
     password: $scope.password
    };
    $http.post("api/login", $.param(user)).
     then(function(response) {
      // check response
      if(response.loginSuccess) {
       // store user in localstore
       // assump that user has role admin
       user.permission = ["admin"];
       MyAuth.storeUserInLocalStorage(user);
       // redirect to /
       $location.path("/");
      }
     }, function(error) {
      // error
      console.log(error);
      console.log("Because we dont have real api for checking username, password");
      console.log("So that, we hard code here!");
      if($scope.username == "admin" && $scope.password == "admin") {
       // store user in localstore
       // assump that user has role admin
       user.permission = ["admin"];
       MyAuth.storeUserInLocalStorage(user);
       // redirect to /
       $location.path("/");
      } else {
       alert("Đăng nhập không thành công");
      }
     });
   }
  }]);
})();
