application.controller("sendDonnes",function($scope,$http, $window){

    // Verfification de chnagement de mot de passe : newPassword est le nouveau, newPasswordVer est le password retapé
    $scope.newPassword = "";
    $scope.oldPassword = "";
    $scope.newPasswordVer = "";

    // si les mots de passes sont identiques 'linput est normal; sinon le input devient rouge et le formulaire ne fonctionnera pas qu'apres la correction d'erreur
    $scope.isTheSame = false;

   // Submit
    $scope.sendDonnes = function(e){
       

        // Recuperation des champs du formulaire
        var nouv = $scope.newPassword;
        var ver = $scope.newPasswordVer;
        var old = $scope.oldPassword;

        // recuperation d id a partir d url
        var url = $window.location.href;
        var index = url.indexOf("=") + 4;
        var id = url.substring(index);
        id = id.substring(0,1);
        
        if(nouv == ver){
            $http.post("api/changePassword",{"oldpassword":old,"newpassword":nouv,"id":id}).then(function(resultat){
                if(resultat.data.success){
                    $window.location.href = "index.html?id="+id;
                }else {
                    alert("Votre ancien mot de passe est invalide! Veuiller retapez votre ancien mot de passe");
                }
            })
        }
    }


    // input rouge ( error ) si les mots de passes sont inconvenebales
    $scope.verifyNewRetap = function(){
        var nouv = $scope.newPassword;
        var ver = $scope.newPasswordVer;
        if(nouv==ver){
            $scope.isTheSame = false;
        }else {
            $scope.isTheSame = true;
        }
    }

    // quand la page se load 
    $window.onload = function(){
        // On recupere le url et on extract le id de cet url
        var url = $window.location.href;
        var index = url.indexOf("=") + 4;
        var id = url.substring(index);
        id = id.substring(0,1);
        
        // recuperation d user a partir de son id
        $http.post("api/usere",{"id":id}).then(function(res){
            user =$scope.username = res.data.username;
        })


    }


})