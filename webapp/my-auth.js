(function(){
 "use strict";
 angular.module("Service.MyAuth", [])
  .service("MyAuth", ["MyLocalStorage", function(MyLocalStorage){
 
   this.checkPermission = function(route) {
    if(!route.requireLogin) {
     // dont require login
     return true;
    } else {
     return this.isLogined() && hasPermission(route.requirePermission);
    }
   }
 
   this.storeUserInLocalStorage = function(user) {
    // after login successful, we store somewhere in local for check
    MyLocalStorage.setObject("userLogined", user);
   }
 
   this.clearUserInLocalStorage = function(user) {
    // after login successful, we store somewhere in local for check
    MyLocalStorage.remove("userLogined");
   }
 
   this.isLogined = function() {
    // get user that logined from localstorage
    return JSON.stringify(MyLocalStorage.getObject("userLogined")) != JSON.stringify({});
   }
 
   function hasPermission(permssionRequired) {
    var user = MyLocalStorage.getObject("userLogined");
    var permissionOfUser = user.permssion; //["admin","user"]
    return permissionOfUser.indexOf(permssionRequired) != -1;
   }
 
  }]);
})();
