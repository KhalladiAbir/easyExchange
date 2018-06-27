application.controller("easyChange",function($scope, $http, $window){
	alert($window.location.href)
	$window.onload = function(e){
		$http.get('/api/currentUserID').then(function(res){
			$scope.msg = res;
		})
	}
})