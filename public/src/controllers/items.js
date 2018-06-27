app.controller("itemCtrl",function($scope){
    // Slider les preferences 
    $scope.slidePreferences = true;
    $scope.slideWidgets = true;

    // Afficher 
    $scope.slidePrefs = function(){
        $scope.slidePreferences = $scope.slidePreferences ? false : true;
    }

    $scope.slideWidgs = function(){
        $scope.slideWidgets = $scope.slideWidgets ? false : true;
    }
})