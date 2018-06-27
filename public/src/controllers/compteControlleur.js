app.controller("comptesRendusCtrl",function($scope, $http){
    
    $scope.consultationZone = false;

    $scope.operations = [];
    $scope.consulterAchats = function(){

        var month = $scope.numberMonth;

        $http.post("api/getCRAchats",{"month":month}).then(function(res){
                $scope.operations = res.data;
        })

        // 
        $scope.consultationZone = true;
    }
    $scope.closeConsultationZone = function(){
        $scope.consultationZone = false;
    }

    $scope.consulterVentes = function(){
        var month = $scope.numberMonth;

        $http.post("api/getCRVentes",{"month":month}).then(function(res){
                $scope.operations = res.data;
        })

        // 
        $scope.consultationZone = true;
    }

    $scope.consulterCessions = function(){
        var month = $scope.numberMonth;

        
        $http.post("api/getCRCessions",{"month":month}).then(function(res){
                $scope.operations = res.data;
        })

        
        
        // 
        $scope.consultationZone = true;
    }

    $scope.consulterAll = function(){
        var date = $scope.dateOp;

        $http.post("api/getJournal",{"date":date}).then(function(res){
            $scope.operations = res.data;
        })
    
        // 
        $scope.consultationZone = true;
    }

})