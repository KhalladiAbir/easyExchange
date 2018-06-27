app.controller("achatCtrl",function($scope, $timeout, $http, $window, $rootScope){



    // formulaire d operation est affcihé et les autres non affiché au debut
    $scope.operationStatus = true;
    $scope.achatDonnesStatus = false;
    $scope.clientDonnesStatus = false;


    /* Debut Globalité */

    $scope.globalOperationDate = "";
    $scope.globalOperationDataClient = "";
    $scope.globalOperationNationality = "";
    $scope.globalOperationNature = "";
    $scope.globalOperationPaymentNature = "";
    $scope.globalDonnesDenomination = "";
    $scope.globalDonnesMontant = "";
    $scope.globalDonnesCoursApplique = "";
    $scope.globalDonnesCoursDh = "";
    $scope.globalAchatNom = "";
    $scope.globalAchatPrenom = "";
    $scope.globalAchatResidenceActuelle = "";
    $scope.globalAchatDateDeliv = "";
    $scope.globalAchatLieuDeliv = "";
    $scope.globalAchatNumero = "";
    $scope.globalAchatNature = "";
    $scope.globalAchatNumeroDec = "";
    $scope.globalAchatDateDec = "";
    $scope.globalAchatAutority = "";


    
    // Helper
    var helper =0;

    $scope.EnrigistrerDonnes = function(){

    $scope.globalOperationDate = $scope.operationDate;
    $scope.globalOperationDataClient = $scope.operationDataClient;
    $scope.globalOperationNationality = $scope.operationNature;
    $scope.globalOperationNature = $scope.operationNature;
    $scope.globalOperationPaymentNature = $scope.operationPaymentNature;
    
    // variales de help
    var length = $scope.operations;
    // Big Montant est le montant est superier a 10000
    var verifyBigMontantExist = false;
    //verification de premier form
    if(length==0){
        alert("Un champ ou plusieurs champs sont invalides.")
    } else {
        var array = $scope.operations;
        for(let i =0; i<array.length; i++){
            if(array[i].montant >= 10000 ){
                verifyBigMontantExist = true;
            }
        }

        

        // Enrigister si les donnees du client sont demandés
        if(verifyBigMontantExist==true){
            
            if(helper==0){
                alert("Veuillez inserer vos données s'il vous plait");
                helper++;
            }
            $rootScope.medHeightA = false;
            $rootScope.bigHeightA =true;
            $scope.clientDonnesStatus = true;

            var help1 = $scope.achatNom;
            var help2 = $scope.achatPrenom;
            var help3 = $scope.achatResidenceActuelle;
            var help4 = $scope.achatNumero;
            var help5 = $scope.achatNature;
            var help6 = $scope.achatNumeroDeclaration;
            var help7 = $scope.achatDateDeclaration;
            var help8 = $scope.achatDateDelivrance;
            var help9 = $scope.achatLieuDelivrance;
            var help10 = $scope.achatAutority;

            
            if(help1  != "anonyme" && help2 != "anonyme" && help3  != "anonyme" && help4 !="anonyme" 
               && help5  != "anonyme" && help6  != "anonyme" && help7 !="anonyme"
               && help8  != "anonyme" && help9  != "anonyme" && help10 !="anonyme"){
                   // Http Post

                   
                   $http.post("api/addOperationAchat",{
                    "sequence_bordereau":$rootScope.numBordereauA,   
                    "date_operation":$scope.operationDate,
                       "nationality":$scope.operationNationality,
                       "anonyme":$scope.operationDataClient,
                       "nature_op":$scope.operationNature,
                       "nature_payement":$scope.operationPaymentNature,
                       "operations":$scope.operations,
                       "ca_nom":$scope.achatNom,
                       "ca_prenom":$scope.achatPrenom,
                       "ca_residence":$scope.achatResidenceActuelle,
                       "pi_nature":$scope.achatNature,
                       "pi_numero":$scope.achatNumero,
                       "pi_date_delivrance":$scope.achatDateDelivrance,
                       "pi_lieu_delivrance":$scope.achatLieuDelivrance,
                       "pi_autorite_delivrante":$scope.achatAutority,
                       "numero_declaration":$scope.achatNumeroDeclaration,
                       "date_declaration":$scope.achatDateDeclaration,
                       
                   }).then(function(res){
                       alert( res.data.success) ;
                  
                   })

            }else {
            }
        }
        // Enrigister si les donnees du client ne sont pas demandés
        else {
            alert("Envoi sans client");
            // Http Post
            
            $http.post("api/addOperationAchat",{
                "sequence_bordereau":$rootScope.numBordereauA,   
                "date_operation":$scope.operationDate,
                "nationality":$scope.operationNationality,
                "anonyme":$scope.operationDataClient,
                "nature_op":$scope.operationNature,
                "nature_payement":$scope.operationPaymentNature,
                "operations":$scope.operations

               }).then(function(res){
                   alert(res.data.success)
               })
        }
    }




    //
    $scope.globalDonnesDenomination = $scope.donnesDenomination;
    $scope.globalDonnesMontant = $scope.donnesMontant;
    $scope.globalDonnesCoursApplique = $scope.donnesCoursApplique;
    $scope.globalDonnesCoursDh = $scope.donnesCoursDh;
    //
    $scope.globalAchatNom = $scope.achatNom;
    $scope.globalAchatPrenom = $scope.achatPrenom;
    $scope.globalAchatResidenceActuelle = $scope.achatResidenceActuelle;
    $scope.globalAchatDateDeliv = $scope.achatDateDelivrance;
    $scope.globalAchatLieuDeliv = $scope.achatLieuDelivrance;
    $scope.globalAchatNumero = $scope.achatNumero;
    $scope.globalAchatNature = $scope.achatNature;
    $scope.globalAchatNumeroDec = $scope.achatNumeroDeclaration;
    $scope.globalAchatDateDec = $scope.achatDateDeclaration;
    $scope.globalAchatAutority = $scope.achatAutority;

    }
    /* Fin Globalité */


    /* Mini Tache Achat Operation commence */
    
    var devicesEnDH = [
        {"name":"EURO","coursApp":"11"},
        {"name":"DOLLAR","coursApp":"8.5"},
        {"name":"REYAL","coursApp":"4.00"}
    ]
    
    // Operation variables 
    
    var d = new Date();

    var datestring = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    $scope.operationDate = datestring;
    $scope.operationDataClient = "" ;
    $scope.operationNationality = "" ;
    $scope.operationNature = "" ;
    $scope.operationPaymentNature = "";

    // On peut ajouter une operation et la modifier qu'apres l'inserer sur la page 
    $scope.addOperationButton = true;
    $scope.editOperationButton = false;

    // le message d'enririgstrement ou error est caché et n'apparait qu'apres que l'operation s'effectue
    $scope.zoneMsg = false;
    $scope.saveMsg = false;
    $scope.errorMsg = false;
    $scope.savedWell = false;

    // le formulaire de modification d'operation est caché au début et le formulaire original est valable
    $scope.editAchatOperationArea = false;
    $scope.editPreventInOriginalForm = false;

    // Varibles de stock : on stocke les valeurs insérés dans des varibles pour qu on puisse les recuperer si l'user clique sur Annuler la modification
    var stockDate, stockNationalite, stockData, stockPayment, stockNature;

    $scope.addOperation = function(){
        
        var date = $scope.operationDate ;
        var dataClient = $scope.operationDataClient;
        var nationality = $scope.operationNationality;
        var nature = $scope.operationNature;
        var payment = $scope.operationPaymentNature;

        if(date!="" && dataClient!="" && dataClient !="" && nationality!="" && nature!="" && payment!="" ){
            
            $scope.editPreventInOriginalForm = true;
            
            // message de la reussite d enrigistrement s'affiche et disparait en deux secondes
            $scope.zoneMsg = true;
            $scope.saveMsg = true;
            $scope.savedWell = false;
            $timeout(function(){
                $scope.saveMsg = false;
                $scope.zoneMsg = false;    
            },2000)

            // Pour changer les données de l operation il faut modifier mainteneant
            $scope.addOperationButton = false;
            $scope.editOperationButton = true;

            // Affichage de Formulaire ( donnes sur achat)
            $scope.achatDonnesStatus = true;

            $rootScope.begHeightA = false;
            $rootScope.medHeightA = true;


            // Importation des devices
            
            var devicesImported = $rootScope.devices;

            devicesEnDH = [];
            for(let i=0; i<devicesImported.length; i++){
                var dev = {
                    "name":devicesImported[i].devises, "coursApp":devicesImported[i].cours_achat
                }

                devicesEnDH.push(dev);
            }
            $rootScope.devises = devicesEnDH;
        
        }else {

            $scope.zoneMsg = true;
            $scope.errorMsg = true;

            $timeout(function(){
                $scope.errorMsg = false;
                $scope.zoneMsg = false;
            },5000)

        }

        // Afficher le formulaire de modification d'operation
        $scope.showEditOperationArea = function(){
            
            // Stockage
            stockDate = $scope.operationDate;
            stockNationalite = $scope.operationNationality;
            stockData = $scope.operationDataClient;
            stockPayment = $scope.operationPaymentNature;
            stockNature = $scope.operationNature;

            $scope.editAchatOperationArea = true;
        }

        // Annuler la modification d'operation 
        $scope.cancelEditOperation = function(){

            // Recuperation des valeurs Stcokés
            $scope.operationDate = stockDate;
            $scope.operationNationality = stockNationalite;
            $scope.operationDataClient = stockData;
            $scope.operationPaymentNature = stockPayment;
            $scope.operationNature = stockNature;

            $scope.editAchatOperationArea = false;

        }

        // Enrigistrer les modifications
        $scope.saveModifications = function(){
            $scope.editAchatOperationArea = false;
        }

    }

    /* Mini tache Achat Operation terminé */



    /* Mini tache Données sur l'Achat commence */

    // La zone de modification des données est caché au début
    $scope.editDataAchatArea = false;

    // Option ajouter des donnes est valable et l otion de modifier est non valable au debut
    $scope.donnesAddOption = true;
    $scope.donnesEditOption = false;

    // On ne peut pas ajouter apres avoir ajouté la premiere fois mais modifier
    $scope.cacheAddDonnes = false;

    
    // msg d error ou de resussite d'ajout 
    $scope.donnesWellSaved = false;
    $scope.donnesErrorSaving = false;
    $scope.donnesZoneMsg = false;

    // donnees
    $scope.donnesDenomination = 
    $scope.donnesMontant = "";
    $scope.donnesCoursApplique = "";
    $scope.donnesCoursDh = "";
    
    // mauvais chiffre
    $scope.badChiffre = false;

    // Statut de montant
    var montantSt = 0;

    // tableau des operations 
    $scope.operations = [];

    // reussite ou error : un message s'affcihe et disparait .. soit d erreur ou de reussiite d enrigistrement et si l operation reussit on ne pourra pas ajouter apres mais modifier
    $scope.donnesAdd = function(){
    

    if($scope.donnesDenomination != "" && $scope.donnesMontant != "" && $scope.donnesCoursApplique != "" && $scope.donnesCoursDh != "" && $scope.badChiffre != true){
        $scope.donnesWellSaved = true;
        $scope.donnesZoneMsg = true;
        $timeout(function(){
            $scope.donnesWellSaved = false;
            $scope.donnesZoneMsg = false;
        },2000)

        $scope.donnesAddOption = false;
        $scope.donnesEditOption = true;
        $scope.cacheAddDonnes = true;

        var montant = $scope.donnesMontant;

       

        // Valeurs dans la table
        var denom = $scope.donnesDenomination;
        var mont = $scope.donnesMontant;
        var courApp = $scope.donnesCoursApplique;
        var courDh = $scope.donnesCoursDh;
        var id = 0;

        $scope.operations.push(
            {
                "id":id,
                "denom":denom,
                "montant":mont,
                "courApp":courApp,
                "courDh":courDh, 
             }
        );

        id = id+1 ;
    }else {
        $scope.donnesErrorSaving = true;
        $scope.donnesZoneMsg = true;
        $timeout(function(){
            $scope.donnesErrorSaving = false;
            $scope.donnesZoneMsg = false;
        },2000)
    }

    }
 

    // Nouveau Operation 
    $scope.nouveauOperation = function(){
        $scope.donnesAddOption = true;
        $scope.cacheAddDonnes = false;
        $scope.donnesEditOption = false;

        $scope.donnesCoursApplique = "";
        $scope.donnesDenomination = "";
        $scope.donnesCoursApplique = "";
        $scope.donnesCoursDh = "";
    }

    // Supprimer l'operation 
    $scope.deleteOp = function(id){
        $scope.operations.splice(id,1);
    }

    // Stock au cas d annulation 
    var stockMontant, stockDenom, stockCoursApp, stockCoursDh;

    $scope.donnesEdit = function(){

        
        stockMontant = $scope.donnesMontant;
        stockDenom = $scope.donnesDenomination;
        stockCoursApp = $scope.donnesCoursApplique;
        stockCoursDh = $scope.donnesCoursDh;

        $scope.editDataAchatArea = true;
    }


    // Validation ou Annulation de la modification 

    $scope.cancelDonnesEdit = function(){
        
        $scope.donnesMontant = stockMontant;
        $scope.donnesDenomination = stockDenom;
        $scope.donnesCoursApplique = stockCoursApp;
        $scope.donnesCoursDh = stockCoursDh; 

        if(!isNaN($scope.donnesMontant)){
            $scope.badChiffre = false;
        }
        $scope.editDataAchatArea = false;
    }

    $scope.errorAnim = false; 

    $scope.saveDonnesEdit = function(){
        if($scope.badChiffre==true){
            $scope.errorAnim = true;
            $timeout(function(){
                $scope.errorAnim = false;
            },200)
        }else {
            $scope.editDataAchatArea = false;
        }
        var mt = $scope.donnesMontant;
        if(mt>10000){
            $scope.clientDonnesStatus = true;
            montantSt = 1;
        }else {
            $scope.clientDonnesStatus = false;
            montantSt = 0;
        }
    }



    // On change le cours appliqué quand on change la denomination 
    $scope.coursAppChanged = function(){
       
        var deviceSelected = $scope.donnesDenomination;

        for(let i=0;i<devicesEnDH.length;i++){
            if(devicesEnDH[i].name == deviceSelected ){
                $scope.donnesCoursApplique = devicesEnDH[i].coursApp;
                var montant = $scope.donnesMontant;
                       if(!isNaN(montant)){
                           $scope.badChiffre = false;
                           $scope.donnesCoursDh = ( $scope.donnesMontant * $scope.donnesCoursApplique ) + " Dh";
                       }else {
                            $scope.badChiffre = true;
                       }
            }
        }
    }

    // verifier la validité du Montant .. c'est un chiffre
    $scope.validMontant = function(){
        var montant = $scope.donnesMontant;
        if(!isNaN(montant)){
            $scope.badChiffre = false;
            $scope.donnesCoursDh = ( $scope.donnesMontant * $scope.donnesCoursApplique ) + " Dh";
        }else {
            $scope.badChiffre = true;
        }
    } 

    /* Mini tache Données sur l'Achat terminé */

    /* Mini Tache Client commence */

    // la verification de la validité de numero de declaration se fait apres taper qlq chose sur la zone du texte 
    $scope.validNumeroDeclaration = null;  
    // La verification de la validité de numero d'indentité se fait apres taper qlq chose sur la zone du texte
    $scope.validNumeroIdentity = null;

    // Le button d'ajouter le client est valable au début et non valable après, mais le fait de modifier qui est valable
    $scope.addClientAvailableOption = true;
    $scope.editClientAvailableOption = false;

    /* 
    * Donnees du Client par defaut
    */
    // Donnees personneles
    $scope.achatNom = "anonyme";
    $scope.achatPrenom = "anonyme";
    $scope.achatResidenceActuelle = "anonyme";
    //Pieces d'identité
    $scope.achatDateDelivrance = "anonyme";
    $scope.achatLieuDelivrance = "anonyme";
    $scope.achatNumero = "anonyme";
    $scope.achatNature = "anonyme";
    $scope.achatAutority = "anonyme";
    //Info sur Devices
    $scope.achatNumeroDeclaration = "anonyme";
    $scope.achatDateDeclaration = "anonyme";

    /* 
    * Donnees du Client par defaut dans le formulaire
    */

    // Donnees personneles
    $scope.formNom = "";
    $scope.formPrenom = "";
    $scope.formResidenceActuelle = "";
    //Pieces d'identité
    $scope.formDateDelivrance = "";
    $scope.formLieuDelivrance = "";
    $scope.formNumero = "";
    $scope.formNature = "";
    $scope.formAutority = "";
    //Info sur Devices
    $scope.formNumeroDeclaration = "";
    $scope.formDateDeclaration = "";


    // le formulaire pour ajouter ou modifier le Client est caché au début
    $scope.addClientArea = false;

    // La methode CancelAddingOperation annule l'ajout du client et cache la zone d'ajout 
    $scope.cancelAddingOperation = function(){
        
        $scope.addClientArea = false;

        // On rend l option de modifier les données inserés valable 
        $scope.editClientAvailableOption = true;
    }

    // La methode showAddingArea affiche le formulaire d'ajout avec tous les champs vides ..
    $scope.showAddingArea = function(){

        $scope.formNom = "";
        $scope.formPrenom = "";
        $scope.formResidenceActuelle = "";
        $scope.formDateDelivrance = "";
        $scope.formLieuDelivrance = "";
        $scope.formNumero = "";
        $scope.formNature = "";
        $scope.formAutority = "";
        $scope.formNumeroDeclaration = "";
        $scope.formDateDeclaration = "";

        // on cache le button d'ajouter et on rend l option de modifier valable
        $scope.addClientAvailableOption = false;
        
        // Afficher le formulaire
        $scope.addClientArea = true;


    }

    // La methode editClientData affiche le formulaire et prend les données du client actuelle at l insere dans les zone du texte
    // si une donnée est 'anonyme' le champs sera vide 
    $scope.editClientData = function(){
        
        /* 
        * Traitement des donnees
        */

        if($scope.achatNom == "anonyme"){
            $scope.formNom = "";
        }else {
            $scope.formNom = $scope.achatNom;
        }
        if($scope.achatPrenom == "anonyme"){
            $scope.formPrenom = "";
        }else {
            $scope.formPrenom = $scope.achatPrenom;
        }

        if($scope.achatResidenceActuelle == "anonyme"){
            $scope.formResidenceActuelle = "";
        }else {
            $scope.formResidenceActuelle = $scope.achatResidenceActuelle;
        }


        if($scope.achatNature == "anonyme"){
            $scope.formNature = "";
        }else {
            $scope.formNature = $scope.achatNature;
        }
        
        if($scope.achatNumero == "anonyme"){
            $scope.formNumero = "";
        }else {
            $scope.formNumero = $scope.achatNumero;
        }

        if($scope.achatLieuDelivrance == "anonyme"){
            $scope.formLieuDelivrance = "";
        }else {
            $scope.formLieuDelivrance = $scope.achatLieuDelivrance;
        }

        if($scope.achatDateDelivrance == "anonyme"){
            $scope.formDateDelivrance = "";
        }else {
            $scope.formDateDelivrance = $scope.achatDateDelivrance;
        }

        if($scope.achatAutority == "anonyme"){
            $scope.formAutority = "";
        }else {
            $scope.formAutority = $scope.achatAutority;
        }
        
        if($scope.achatDateDeclaration == "anonyme"){
            $scope.formDateDeclaration = "";
        }else {
            $scope.formDateDeclaration = $scope.achatDateDeclaration;
        }

        if($scope.achatNumeroDeclaration == "anonyme"){
            $scope.formNumeroDeclaration = "";
        }else {
            $scope.formNumeroDeclaration = $scope.achatNumeroDeclaration;
        }

        // Affichage du formulaire avec les données filtrés 
        $scope.addClientArea = true;
    }


    $scope.validateClient = function(){
       
        
    /* 
    * Traitement des donnees
    */

    if($scope.formNom == ""){
        $scope.achatNom = "anonyme";
    } else {
        $scope.achatNom = $scope.formNom;
    }
    if($scope.formPrenom == ""){
        $scope.achatPrenom = "anonyme";
    }else {
        $scope.achatPrenom = $scope.formPrenom;
    }

    if($scope.formResidenceActuelle == ""){
        $scope.achatResidenceActuelle = "anonyme";
    }else {
        $scope.achatResidenceActuelle = $scope.formResidenceActuelle;
    }


    if($scope.formNature == ""){
        $scope.achatNature = "anonyme";
    }else {
        $scope.achatNature = $scope.formNature;
    }
    
    if($scope.formNumero == ""){
        $scope.achatNumero = "anonyme";
    }else {
        $scope.achatNumero = $scope.formNumero;
    }

    if($scope.formLieuDelivrance == ""){
        $scope.achatLieuDelivrance = "anonyme";
    }else {
        $scope.achatLieuDelivrance = $scope.formLieuDelivrance;
    }

    if($scope.formDateDelivrance == ""){
        $scope.achatDateDelivrance = "anonyme";
    }else {
        $scope.achatDateDelivrance = $scope.formDateDelivrance;
    }

    if($scope.formAutority == ""){
        $scope.achatAutority = "anonyme";
    }else {
        $scope.achatAutority = $scope.formAutority;
    }
    
    if($scope.formDateDeclaration == ""){
        $scope.achatDateDeclaration = "anonyme";
    }else {
        $scope.achatDateDeclaration = $scope.formDateDeclaration;
    }

    if($scope.formNumeroDeclaration == ""){
        $scope.achatNumeroDeclaration = "anonyme";
    }else {
        $scope.achatNumeroDeclaration = $scope.formNumeroDeclaration ;
    }

    // On rend l option de modifier les données inserés valable 
    $scope.editClientAvailableOption = true;

    // Cacher le formulaire apres la validation
    $scope.addClientArea = false;

    }



    // Verification de la validité de Numero de la declaration
    // si le numero est n est pas de type Integer et contient plus au moins de 20 chiffre il sera considéré comme Invalid
    $scope.isValidNumber = function(){

        var number = $scope.formNumeroDeclaration;
        
        if(number.length==20 && !isNaN(number)){
            $scope.validNumeroDeclaration = false;
        }else {
            $scope.validNumeroDeclaration = true;
        }
    }

    // Verification de la validité du Numero d'identité
    // Si le nombre de chiffres de numero est plus que 12 chiffres ou les lettres utilisés sont des miniscules, Le numero est rejeté
    $scope.isValidIdentityNumber = function(){
        var number = $scope.formNumero;
        var min = true;
        if(number.length<13 && number.length>8 ){
            
            
            // On parcourirera la chaine et si les caracteres sont minuscules
            for(let i=0; i<number.length; i++){
                if(isNaN(number[i])){
                    if(number[i] != number[i].toUpperCase()){
                        min = false;
                    }
                }
            }

            $scope.validNumeroIdentity = min ? false : true;

            
        }else {
            $scope.validNumeroIdentity = true;
        }
    }

    // Decoration 

    $scope.activeAddBorder = null;
    $scope.activeEditBorder = null;

    $scope.activateAddBorder = function(){
        $scope.activeAddBorder = true;
    }
    $scope.desactivateAddBorder = function(){
        $scope.activeAddBorder = false;
    }

    $scope.activateEditBorder = function(){
        $scope.activeEditBorder = true;
    }
    $scope.desactivateEditBorder = function(){
        $scope.activeEditBorder = false;
    }



    /* Mini Tache Client Terminé */ 

})