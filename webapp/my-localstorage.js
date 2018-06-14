(function(){
 "use strict";
 angular.module("Service.MyLocalStorage", [])
  .service("MyLocalStorage", ["$window", function($window){
   var localStorage = $window.localStorage;
 
   this.set = function(key, value) {
                localStorage[key] = value;
            }
 
            this.get = function(key) {
                return localStorage[key];
            }
 
            this.setObject = function(key, value) {
                localStorage[key] = angular.toJson(value);
            }
 
            this.getObject = function(key) {
                var strObject = localStorage[key];
                if (strObject != undefined && strObject !== null)
                    return JSON.parse(strObject);
                return {};
            }
 
            this.getListObject = function(key) {
                var strObject = localStorage[key];
                if (strObject != undefined && strObject !== null)
                    return JSON.parse(strObject);
                return [];
            }
 
            this.remove = function(key) {
                localStorage.removeItem(key);
            }
 
            this.getAllKeys = function() {
                var keys = [];
                for (var i = 0; i < localStorage.length; i++) {
                    keys.push(localStorage.key(i));
                }
                return keys;
            }
 
            this.removeAllItem = function() {
                for (var i = 0; i < localStorage.length; i++) {
                    this.remove(localStorage.key(i));
                }
            }
 
  }]);
})();
