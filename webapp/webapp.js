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
    	$scope.CamBienMua = "không có tín hiệu từ cảm biến";
    	$scope.leds_status = [1, 1]
	$scope.phunsuongs_status = [1, 1]
	
	
	
	//Cách gửi tham số 1: dùng biến toàn cục! $scope.<tên biến> là biến toàn cục
	$scope.changeLED = function() {
		console.log("send LED ", $scope.leds_status)
		var json = {"led": $scope.leds_status}
		mySocket.emit("LED", json)
		}
	$scope.changePHUNSUONG = function() {
		console.log("send PHUNSUONG ", $scope.phunsuongs_status)
		var json = {"phunsuong": $scope.phunsuongs_status}
		mySocket.emit("PHUNSUONG", json)
		}
	
	////Khu 3 -- Nhận dữ liệu từ Arduno gửi lên (thông qua ESP8266 rồi socket server truyền tải!)
	//các sự kiện từ Arduino gửi lên (thông qua esp8266, thông qua server)
	
	//Khi nhận được lệnh NHIETDO_DOAM
	mySocket.on('NHIETDO_DOAM', function(json) {
		console.log("recv NHIETDO_DOAM", json)
		$scope.gia_tri_thu_thap = json.nhietdo_doam
		})
	
	
	//Khi nhận được lệnh LED_STATUS
	mySocket.on('RAIN', function(json) {
		$scope.CamBienMua = (json.digital == 1) ? "Không mưa" : "Có mưa"
		})
	
	//Khi nhận được lệnh LED_STATUS
	mySocket.on('LED_STATUS', function(json) {
		//Nhận được thì in ra thôi hihi.
		console.log("recv LED", json)
		$scope.leds_status = json.data
		})
	//Khi nhận được lệnh PHUNSUONG_STATUS
	mySocket.on('PHUNSUONG_STATUS', function(json) {
		//Nhận được thì in ra thôi hihi.
		console.log("recv PHUNSUONG", json)
		$scope.phunsuongs_status = json.data
		})
	//// Khu 4 -- Những dòng code sẽ được thực thi khi kết nối với Arduino (thông qua socket server)
	mySocket.on('connect', function() {
		console.log("connected")
		mySocket.emit("RAIN") //Cập nhập trạng thái mưa
		mySocket.emit("NHIETDODOAM") //cập nhật cảm biến nhiệt độ độ ẩm
	})
		
});
