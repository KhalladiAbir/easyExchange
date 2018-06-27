app.controller("heightCtrl",function($scope, $rootScope,$http, $window){

    
    $rootScope.begHeight = true;
    $rootScope.medHeight = false;
    $rootScope.bigHeight = false;
    $rootScope.begHeightA = false;
    $rootScope.medHeightA = false;
    $rootScope.bigHeightA = false;

    $scope.sizeV = function(){

    $rootScope.begHeight = true;
    $rootScope.medHeight = false;
    $rootScope.bigHeight = false;
    $rootScope.begHeightA = false;
    $rootScope.medHeightA = false;
    $rootScope.bigHeightA = false;


    }

    $scope.size =function(){
        // resizer la page 
       $rootScope.begHeight = false;
       $rootScope.medHeight = false;
       $rootScope.bigHeight = false;
       $rootScope.begHeightA = true;
       $rootScope.medHeightA = false;
       $rootScope.bigHeightA = false;

    }
    $scope.coursClick = function(){
        $http.get("api/importExcel").then(function(res){
          
        }) 
        $http.get("api/getDataExcel").then(function(res){
            
        $rootScope.devices = res.data.data;
        })
    }

    $window.onload = function(){
        // achat
        $http.get("api/getPays").then(function(res){
            $rootScope.pays = res.data;
        })
        $http.get("api/getNaturePayement").then(function(res){
            $rootScope.payments = res.data;
        })
        $http.get("api/getQualiteClient").then(function(res){
            $rootScope.clientinfos = res.data;
        })
        $http.get("api/getDevises").then(function(res){
            $rootScope.devises = res.data;
        })
        $http.get("api/getNaturePI").then(function(res){
            $rootScope.naturepis = res.data;
        })
        $http.get("api/getLastSequenceBordereau").then(function(res){
            var num = res.data.idbordereau;
            num = num.substring(1,7);
            num++;
    
            /* Mini tache Bordereau commence */
    
            var anneeActuelle = new Date()+"";
            var anneeActuelle = anneeActuelle.substring(13,15);  
            $rootScope.numBordereauA = "A"+num+"/"+anneeActuelle;        
    })
    $http.get("api/importExcel").then(function(res){
          
    }) 
    $http.get("api/getDataExcel").then(function(res){
        
           $rootScope.devices = res.data.data;
    
    })

    
// vente
    $http.get("api/getNatureDotation").then(function(res){
        $rootScope.dotations = res.data;
    })
    $http.get("api/getReferenceAutorisation").then(function(res){
        $rootScope.refs = res.data;
    })
    $http.get("api/getQualiteClient").then(function(res){
        $rootScope.qualites = res.data;
    })
    
    $http.get("api/getPays").then(function(res){
        $rootScope.nationalites = res.data;
    })
    $http.get("api/getLastSequenceBordereauVente").then(function(res){
        var num = res.data.idbordereau;
        num = num.substring(1,7);
        num++;
        /* Mini tache Bordereau commence */


        var anneeActuelle = new Date()+"";
        var anneeActuelle = anneeActuelle.substring(13,15);  
        $rootScope.numBordereauV = "V"+num+"/"+anneeActuelle;
    })

    //cession
    $http.get("api/getBanques").then(function(res){
        $rootScope.banques = res.data;
    })

}
        

})