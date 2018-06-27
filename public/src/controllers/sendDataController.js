application.controller("loginController",function($scope,$http,$window){
    
    // Nom du Client doit contenir moins de 60 lettres
    $scope.invalidName = false;

    // Send Data to Laravel by clicking
    $scope.password = "";
    $scope.username = "";
    $scope.msg = "";
    // Envoie de données aux fichiers du BackEnd
    $scope.sendData = function(e){
        var name = $scope.username;
        if(name.length<60){
            $scope.invalidName = false;
        }else {
            $scope.invalidName = true;
            e.preventDefault();
        }
        $http.post("api/login",{"username":$scope.username,"password":$scope.password}).then(function(resultat){
            if(resultat.data.success){
               var id = resultat.data.user.id;
               var number1 = Math.random()*1000;
               number1 = number1 + "";
               number1 = number1.substring(0,3);
               var number2 = Math.random()*1000;
               number2 = number2 + "";
               number2 = number2.substring(0,3);

               if(resultat.data.user.force_change_password==1){
                   $window.location.href = "changepassword.html?id="+number1+""+id+""+number2;
               }else {
                   $window.location.href = "index.html?id="+number1+""+id+""+number2;
               }
               
            
            }else{
                alert("Votre username ou mot de passe est invalide! Veuilllez réssayer");
            }   
            })
    }

})