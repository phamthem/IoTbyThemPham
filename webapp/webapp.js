angular.module('myApp', [
    	'ngRoute',
   	'mobile-angular-ui',
	'btford.socket-io'
]).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'Home'
    	});
}).factory('mySocket', function (socketFactory) {
	var myIoSocket = io.connect('/webapp');	//Tên namespace webapp
	mySocket = socketFactory({
		ioSocket: myIoSocket
		});
	return mySocket;
/////////////////////// Những dòng code ở trên phần này là phần cài đặt, các bạn hãy đọc thêm về angularjs để hiểu, cái này không nhảy cóc được nha!
}).controller('Home', function($scope, mySocket) {
	
	
	////Khu 1 -- Khu cài đặt tham số 
    	//cài đặt một số tham số test chơi
	//dùng để đặt các giá trị mặc định
    	$scope.nhietdo = " chưa kết nối";
	$scope.doam = "chưa kết nối";
	$scope.trangthaiden = "chưa kết nối";
	$scope.trangthaiphunsuong = "chưa kết nối";
	
	
//khu 2 -- gởi json về cho index.js đển chuyển về cho arduino
	//Cách gửi tham số 1: dùng biến toàn cục! $scope.<tên biến> là biến toàn cục
	$scope.batden = function() {
		console.log("ham bat den duoc thuc thi")
		mySocket.emit("BATDEN")		//gởi chuỗi BATDEN về arduino
		}
	$scope.tatden = function() {
		console.log("ham Tat den duoc thuc thi")
		mySocket.emit("TATDEN")		//gởi chuỗi TATDEN về arduino
		}
	$scope.batphunsuong = function() {
		console.log("ham bat phun suong duoc thuc thi")
		mySocket.emit("BATPHUNSUONG")		//gởi chuỗi BATDEN về arduino
		}
	$scope.tatphunsuong = function() {
		console.log("ham Tat phun suong duoc thuc thi")
		mySocket.emit("TATPHUNSUONG")		//gởi chuỗi TATDEN về arduino
		}
//Khu 3 -- Nhận dữ liệu từ Arduno gửi lên (thông qua ESP8266 rồi socket server truyền tải!)
	//các sự kiện từ Arduino gửi lên (thông qua esp8266, thông qua server)
	
	//Khi nhận được lệnh CBIEN
	mySocket.on('CBIEN', function(json) {
		console.log("recv NHIETDO_DOAM", json)
		$scope.nhietdo = json.nhiet_do
		$scope.doam = json.do_am
		})
	//Khi nhận được lệnh TTDEN
	mySocket.on('TTDEN', function(json) {
		console.log("recv TRANGTHAIDEN", json)
		$scope.trangthaiden = (json.trangthaiden == 1) ? "đèn đã bật" : "đèn đã tắt"
		})
	//Khi nhận được lệnh TTPS
	mySocket.on('TTPSS', function(json) {
		console.log("recv TRANGTHAIPHUNSUONG", json)
		$scope.trangthaiphunsuong = (json.trangthaiphunsuong == 1) ? "phun sương đã bật" : "phun sương đã tắt"
		})
// Khu 4 -- Những dòng code sẽ được thực thi khi kết nối với Arduino (thông qua socket server)
	mySocket.on('connect', function() {
		console.log("connected")
		mySocket.emit("CBIEN") 	//gởi ký tự CBIEN để yêu cầu cập nhật cảm biến nhiệt độ độ ẩm
		mySocket.emit("LED") 	//gởi ký tự CBIEN để yêu cầu cập nhật cảm biến nhiệt độ độ ẩm
		mySocket.emit("PHUNSUONG") 	//gởi ký tự CBIEN để yêu cầu cập nhật cảm biến nhiệt độ độ ẩm
		})
		
});
