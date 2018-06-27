application.controller("passwordController",function($scope,$http, $location,$window){
    
    // Send Data to Laravel by clicking
    $scope.old = "";
    $scope.new = "";
    $scope.newBis = "";
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1MjQyMjgwODksImV4cCI6MTUyNDIzMTY4OSwibmJmIjoxNTI0MjI4MDg5LCJqdGkiOiJHMXZlNFhjdHBGakpEQ3FxIn0.2LoVL9UyWE8zLnd2bGmyaERMikptl6h0kNCZdugx1yY";
    // Envoie de données aux fichiers du BackEnd
    $scope.Enregistrer = function(){
        $http.post("api/changePassword",{"old":$scope.old,"new":$scope.new,"newBis":$scope.newBis,
"token":token
    }).then(function(resultat){
            if(resultat.data.success == true){
                $window.location.href='dashboard';
            }
            
        })
    }


})