
app.controller("menuCtrl",function($scope , $http , $window){
    // Les options des Notifications et les Parametres sont cachées au début
    $scope.displaySettings = false;
    $scope.displayNotifications = false;
    
    // Afficher les notifications et cacher les settings
    $scope.showNotifications = function(){
        $scope.displaySettings = false;
        $scope.displayNotifications = $scope.displayNotifications ? false : true;
    }
    
    // Afficher les settings et cacher les notifications
    $scope.showSettings = function(){
        $scope.displayNotifications = false;
        $scope.displaySettings = $scope.displaySettings ? false : true;
    }

    $window.onload = function(){
        // On recupere le url et on extract le id de cet url
        var url = $window.location.href;
        var index = url.indexOf("=") + 4;
        var id = url.substring(index);
        id = id.substring(0,1);
        if(!url.includes("id")){
            $window.location.href="login.html";
        }
        // recuperation d user a partir de son id
        $http.post("api/usere",{"id":id}).then(function(res){
            $scope.username = res.data.username;
        
        })


    }
})