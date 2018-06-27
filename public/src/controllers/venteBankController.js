app.controller("venteBankCtrl",function($scope, $timeout,$rootScope,$http){
    
    //l'enregistrement de l'operation
    $scope.EnregistrerDonnes = function(){

        $scope.globalOperationDate = $scope.opDate;
        $scope.globalOpIntermediare = $scope.opIntermediare;
        $scope.globalOpDateRecu = $scope.opDateRecu;
        $scope.globalOpReference = $scope.opReference;
        $scope.globalOperations = $scope.operations;
        
    
            if(
                $scope.globalOperationDate == "" || 
                $scope.globalOpIntermediare == "" || 
                $scope.globalOpDateRecu == "" || 
                $scope.globalOpReference == "" || 
                $scope.globalOperations == "" 
                
            ){
                alert("Un ou plusieurs champs sont vides")
            }
            else {
                alert("success")
                
                
                 $http.post("api/addCessionOperation",{
    
                    "date_operation":$scope.globalOperationDate,
    
                    "dateRecu":$scope.globalOpDateRecu,
                    "operations":$scope.operations,
                    "nomInter":$scope.globalOpIntermediare,
                    
                    
                    "reference":$scope.globalOpReference,
                      
                
                    
                }).then(function(e){
                    console.log(e.data);
                })
                
        
            }
        } 
    //dateCession
    var d = new Date();

    var datestring = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    $scope.opDate = datestring;   
    /* 
       ----  Tache Operation commence
    */
   $scope.zoneDonnes = false;
    // le formulaire de modification est caché
    $scope.zoneOperationEdit = false;
    
    // On ne peut qu'ajouter au début 
    $scope.addOptionOperation = true;
    $scope.editOptionOperation = false;


    // Valid reference  -  //error - bad refence format 
    $scope.refFormat = true;
    $scope.validRef = function(){
        var reference = $scope.opReference;
        $scope.refFormat = (reference == "" || ( reference.length == 6 && !isNaN(reference))) ? true : false;
        var valid = $scope.refFormat;
        return valid;
    }


    $scope.opFile = "";

    $scope.fileNameChanged = function (ele) {
        var files = ele.files;
        var string = files[0].name;
        $scope.opFile = string.substring(0,5) + "..";
    }

    // Valider le formulaire d'operation
    $scope.addOperation = function(){
        var data_1 = $scope.opReference;
        var data_2 = $scope.opFile;
        var data_3 = $scope.opIntermediare;
        var data_4 = $scope.opDate;
        var data_5 = $scope.opDateRecu;
        if(data_5 != "" && data_2!="" && data_3!="" && data_4!="" && isValidref(data_1)){
            alert("données bien enrigistré")
            $scope.addOptionOperation = false;
            $scope.editOptionOperation = true;
            $scope.zoneDonnes = true;

             // Importation des devices
             
              var devicesImported = $rootScope.devices;
             

             devicesEnDH = [];
             for(let i=0; i<devicesImported.length; i++){
                 var dev = {
                     "name":devicesImported[i].devises, "coursApp":devicesImported[i].vente_banque
                 }
 
                 devicesEnDH.push(dev);
             }
             $rootScope.devises = devicesEnDH; 
         

        }else {
            alert("Un ou plusiuers champs sont invalides! Veuillez corriger!")
        }
    }

    function isValidref(reference){
        return (( reference.length == 6 && !isNaN(reference)));
    }

    var data__1 ;
    var data__2 ;
    var data__3 ;
    var data__4 ;
    var data__5;


    $scope.editOperation = function(){
        
        data__1 = $scope.opReference;
        data__2 = $scope.opFile;
        data__3 = $scope.opIntermediare;
        data__4 = $scope.opDate;
        data__5 = $scope.opDateRecu;

        $scope.zoneOperationEdit = true;
    }

    $scope.annulerOp = function(){
        
        $scope.opReference = data__1;
        $scope.opFile = data__2;
        $scope.opIntermediare = data__3;
        $scope.opDate = data__4;
        $scope.opDateRecu = data__5;

        $scope.zoneOperationEdit = false;
    }

    $scope.validerOp = function(){
        $scope.zoneOperationEdit = false;
    }

    
    /* 
       ----  Tache Operation terminée
    */
    
    /* 
       ----  Tache Données sur l'operation commence
    */

   $scope.operations = [];
    // Operations 
    /* $scope.operations = [
        {"denom":"Euro","montant":"15","coursApp":"11","coursDh":"165","inter":"bmce","ref":"325686","date":"20/17","heure":"18:56"},
        {"denom":"Euro","montant":"15","coursApp":"11","coursDh":"165","inter":"bmce","ref":"325686","date":"20/17","heure":"18:56"}
    ]; */

    // 
    $scope.editDonnesOperation = false;
    $scope.formulaireCacheur = false;
    $scope.dnOptionAdd = true;
    $scope.dnOptionEdit = false;


    $scope.dnMontant = "";

    $scope.validMontant = function(){
        var string = $scope.dnMontant;
        if(!isNaN(string) || string==""){
            $scope.dnCoursDh = string*$scope.dnCoursApp;
            return false;
        }else {
            return true;
        }
        
    }
    
    // On change le cours appliqué quand on change la denomination 
    $scope.setCoursApp = function(){
       
        var deviceSelected = $scope.dnDevice;

        for(let i=0;i<devicesEnDH.length;i++){
            if(devicesEnDH[i].name == deviceSelected ){
                $scope.dnCoursApp = devicesEnDH[i].coursApp;
                var montant = $scope.dnMontant;
                       if(!isNaN(montant)){
                           $scope.badChiffre = false;
                           $scope.dnCoursDh = ( $scope.dnMontant * $scope.dnCoursApp ) + " Dh";
                       }else {
                            $scope.badChiffre = true;
                       }
            }
        }
    }

    $scope.saved = false;
    $scope.saved_2 = false;
    $scope.erreur = false;

    $scope.dnAdd = function(){
        var don_1 = $scope.dnMontant;
        var don_2 = $scope.dnDevice;

        if(don_1 != "" && don_2 != "" && !isNaN(don_1)){
            $scope.formulaireCacheur = true;
            $scope.dnOptionAdd = false;
            $scope.dnOptionEdit = true;
            $scope.dnOptionNouveau = true;

            // Traitement de message d'erreur ou d'enrigistrement
            
            $scope.saved = true;
            $timeout(function(){
                $scope.saved_2 = true;
            },200)
            $timeout(function(){
                $scope.saved_2 = false;
                
                $scope.saved = false;
            },2500)
            
            // Traitement d'ajout d'operation
            var op = {
                "denom":$scope.dnDevice,"montant":$scope.dnMontant,"coursApp":$scope.dnCoursApp,"coursDh":$scope.dnCoursDh,"inter":$scope.opIntermediare,"ref":$scope.opReference,"date":new Date().getDay()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear(),"heure": "18:45"
            }
            $scope.operations.push(op);

        }else {
            
            $scope.saved = true;
            $timeout(function(){
                $scope.erreur = true;
            },200)
            $timeout(function(){
                $scope.erreur = false;
                $scope.saved = false;
            },2500)
            
        }

    }

    var mt;
    var device_app;

    $scope.dnEdit = function(){
        mt = $scope.dnMontant;
        device_app = $scope.dnDevice;
        $scope.editDonnesOperation = true;

    }
    //nouveau opperation
    $scope.dnNouveau = function(){

            $scope.dnOptionAdd = true;
            $scope.dnOptionNouveau = false ;
            $scope.formulaireCacheur = false;
            $scope.dnMontant = "";
            $scope.dnDevice = "";



    }

    $scope.animation = false;

    $scope.dnValider = function(){
        var valid = $scope.validMontant();
        if(valid!=true){
            $scope.editDonnesOperation = false;
        }else {
            $scope.animation = true;
        }
    }

    $scope.dnAnnuler = function(){
        $scope.dnMontant = mt;
        $scope.dnDevice = device_app;
        switch(device_app){
            case "EURO":
            $scope.dnCoursApp = 11;
            $scope.dnCoursDh = 11 * $scope.dnMontant;
            break;
            case "REYAL":
            $scope.dnCoursApp = 4.5;
            $scope.dnCoursDh = 4.5 * $scope.dnMontant;
            break;
            case "DOLLAR":
            $scope.dnCoursApp = 8.5;
            $scope.dnCoursDh = 8.5 * $scope.dnMontant;
            break;
        }
        $scope.editDonnesOperation = false;
    }
    // Supprimer l'operation 
    $scope.deleteOp = function(id){
        $scope.operations.splice(id,1);
    }




})