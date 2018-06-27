app.controller("venteCtrl",function($scope, $timeout , $http , $window, $rootScope){



    /* Mini tache Bordereau commence */


     $scope.dataVente = false;
     $scope.dataClient = false;
     $scope.enregistrerData = false;

    /* Mini tache Bordereau terminé */

    /* Debut Globalité */

    $scope.globalOperationDate = "";
    $scope.globalNatureDotation = "";
    $scope.globalReference = "";
    $scope.globalDonnesDenomination = "";
    $scope.globalDonnesMontant = "";
    $scope.globalDonnesCoursApplique = "";
    $scope.globalDonnesCoursDh = "";
    $scope.globalVenteNom = "";
    $scope.globalVentePrenom = "";
    $scope.globalVenteResidenceActuelle = "";
    $scope.globalVenteQualite = "";
    $scope.globalVenteNationalite = "";
    $scope.globalVenteNuPasseport = "";
    $scope.globalVenteCIN = "";


    $scope.EnrigistrerDonnes = function(){

    $scope.globalOperationDate = $scope.operationDate;
    $scope.globalNatureDotation = $scope.natureDotation;
    $scope.globalReference = $scope.reference;
    $scope.globalDonnesDenomination = $scope.donnesDenomination;
    $scope.globalDonnesMontant = $scope.donnesMontant;
    $scope.globalDonnesCoursApplique = $scope.donnesCoursApplique;
    $scope.globalDonnesCoursDh = $scope.donnesCoursDh;
    $scope.globalVenteNom = $scope.venteNom;
    $scope.globalVentePrenom = $scope.ventePrenom;
    $scope.globalVenteResidenceActuelle = $scope.venteResidenceActuelle;
    $scope.globalVenteQualite = $scope.qualite;
    $scope.globalVenteNationalite = $scope.formNationality;
    $scope.globalVenteNuPasseport = $scope.nuPasseport;
    $scope.globalVenteCIN = $scope.cin;

        if(
            $scope.globalOperationDate == "" || 
            $scope.globalNatureDotation == "" || 
            $scope.globalReference == "" || 
            $scope.globalDonnesDenomination == "" || 
            $scope.globalDonnesMontant == "" || 
            $scope.globalDonnesCoursApplique == "" || 
            $scope.globalDonnesCoursDh == "" || 
            $scope.globalVenteNom == "" ||  
            $scope.globalVentePrenom == "" || 
            $scope.globalVenteResidenceActuelle == "" || 
            $scope.globalVenteQualite == "" || 
            $scope.globalVenteNationalite == "" || 
            $scope.globalVenteNuPasseport == "" || 
            $scope.globalVenteCIN == "" 
        ){
            alert("Un ou plusieurs champs sont vides")
        }
        else {
            //alert("saved")
            alert("Success") ;
            
             $http.post("api/addOperationVente",{

                "date_operation":$scope.globalOperationDate,

                "reference":$scope.globalReference,
                "operations":$scope.operations,
                "n_dotation":$scope.globalNatureDotation,
                "ca_nom":$scope.globalVenteNom,
                "ca_prenom":$scope.globalVentePrenom,
                "ca_residence":$scope.globalVenteResidenceActuelle,
                "cin":$scope.globalVenteCIN,

                "nationalite":$scope.formNationalite,
                 "qualite":$scope.globalVenteQualite,
                "numero_passeport":$scope.globalVenteNuPasseport,
                "sequence_bordereau":$rootScope.numBordereauV,  
            
                
            }).then(function(e){
                console.log(e.data);
            })
            
    
        }
    }
    /* Fin Globalité */



    /* Mini Tache Vente Operation commence */
    
    var devicesEnDH = [
        {"name":"EURO","coursApp":"11"},
        {"name":"DOLLAR","coursApp":"8.5"},
        {"name":"REYAL","coursApp":"4.00"}
    ]
    
    // Operation variables 
    var d = new Date();

    var datestring = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    $scope.operationDate = datestring;
    $scope.natureDotation = "" ;
    $scope.reference = "" ;

    // On peut ajouter une operation et la modifier qu'apres l'inserer sur la page 
    $scope.addOperationButton = true;
    $scope.editOperationButton = false;

    // le message d'enririgstrement ou error est caché et n'apparait qu'apres que l'operation s'effectue
    $scope.zoneMsg = false;
    $scope.saveMsg = false;
    $scope.errorMsg = false;

    // le formulaire de modification d'operation est caché au début et le formulaire original est valable
    $scope.editVenteOperationArea = false;
    $scope.editPreventInOriginalForm = false;

    // Varibles de stock : on stocke les valeurs insérés dans des varibles pour qu on puisse les recuperer si l'user clique sur Annuler la modification
    var stockDate, stockNationalite, stockData, stockPayment, stockNature;

    $scope.addOperation = function(){
        var date = $scope.operationDate ;
        var dotation = $scope.natureDotation;
        var reference = $scope.reference;
        

        if(date!="" && dotation!="" && reference!="" ){
            
            $scope.editPreventInOriginalForm = true;
            $scope.dataVente = true;
            
            // message de la reussite d enrigistrement s'affiche et disparait en deux secondes
            $scope.zoneMsg = true;
            $scope.saveMsg = true;
            $timeout(function(){
                $scope.saveMsg = false;
                $scope.zoneMsg = false;    
            },2000)

            // Pour changer les données de l operation il faut modifier mainteneant
            $scope.addOperationButton = false;
            $scope.editOperationButton = true;
 
            
            // 
            
            $rootScope.begHeight = false;
            $rootScope.medHeight = true;

            // Importation des devices
            var devicesImported = $rootScope.devices;

            devicesEnDH = [];
            for(let i=0; i<devicesImported.length; i++){
                var dev = {
                    "name":devicesImported[i].devises, "coursApp":devicesImported[i].cours_vente
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
            stockReference = $scope.reference;
            stockDotation = $scope.natureDotation;
            $scope.editVenteOperationArea = true;
        }

        // Annuler la modification d'operation 
        $scope.cancelEditOperation = function(){

            // Recuperation des valeurs Stcokés
            $scope.operationDate = stockDate;
            $scope.reference = stockReference;
            $scope.natureDotation = stockDotation;     
            $scope.operationNature = stockNature;

            $scope.editVenteOperationArea = false;

        }

        // Enrigistrer les modifications
        $scope.saveModifications = function(){
            $scope.editVenteOperationArea = false;
        }

    }

    /* Mini tache Vente Operation terminé */



    /* Mini tache Données sur l'Vente commence */

    // La zone de modification des données est caché au début
    $scope.editDataVenteArea = false;

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
        $scope.donnesNvOption = true;
        $scope.donnesEditOption = true;
        $scope.cacheAddDonnes = true;

        //visualiser la partie client
       
         $scope.dataClient = true;


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

        $rootScope.medHeight = false;
        $rootScope.bigHeight = true;

    }else {
        $scope.donnesErrorSaving = true;
        $scope.donnesZoneMsg = true;
        $timeout(function(){
            $scope.donnesErrorSaving = false;
            $scope.donnesZoneMsg = false;
        },2000)
    }

    }
 
    // Stock au cas d annulation 
    var stockMontant, stockDenom, stockCoursApp, stockCoursDh;

    $scope.donnesEdit = function(){

        
        stockMontant = $scope.donnesMontant;
        stockDenom = $scope.donnesDenomination;
        stockCoursApp = $scope.donnesCoursApplique;
        stockCoursDh = $scope.donnesCoursDh;

        $scope.editDataVenteArea = true;
    }


    // donner une nouvelle operation de vente 

        $scope.donnesNv =function(){

            $scope.donnesAddOption = true;
            $scope.donnesNvOption = false;
            $scope.donnesEditOption = false;
            $scope.cacheAddDonnes = false;
           $scope.donnesMontant ="";
            $scope.donnesDenomination = "";
            $scope.donnesCoursApplique = "";
            $scope.donnesCoursDh = "";
  
        }

     // Supprimer l'operation 
    $scope.deleteOp = function(id){
        $scope.operations.splice(id,1);
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
        $scope.editDataVenteArea = false;
    }

    $scope.errorAnim = false; 

    $scope.saveDonnesEdit = function(){
        if($scope.badChiffre==true){
            $scope.errorAnim = true;
            $timeout(function(){
                $scope.errorAnim = false;
            },200)
        }else {
            $scope.editDataVenteArea = false;
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

    /* Mini tache Données sur l'Vente terminé */

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
    $scope.qualite = "anonyme";
    $scope.nationalite ="anonyme";
    $scope.venteNom = "Taoufiq";
    $scope.ventePrenom = "Benallah";
    $scope.venteResidenceActuelle = "anonyme";
    $scope.nuPasseport = "anonyme";
    $scope.cin = "anonyme";
    //Pieces d'identité
    $scope.venteDateDelivrance = "anonyme";
    $scope.venteLieuDelivrance = "anonyme";
    $scope.venteNumero = "145";
    $scope.venteNature = "Aucu";
    $scope.venteAutority = "anonyme";
    //Info sur Devices
    $scope.venteNumeroDeclaration = "anonyme";
    $scope.venteDateDeclaration = "anonyme";

    /* 
    * Donnees du Client par defaut dans le formulaire
    */

    // Donnees personneles
    $scope.formNom = "";
    $scope.formPrenom = "";
    $scope.formResidenceActuelle = "";
    $scope.formNuPasseport = "";
    $scope.formCIN ="";
    //Pieces d'identité
    /*$scope.formDateDelivrance = "";
    $scope.formLieuDelivrance = "";
    $scope.formNumero = "";
    $scope.formNature = "";
    $scope.formAutority = "";
    //Info sur Devices
    $scope.formNumeroDeclaration = "";
    $scope.formDateDeclaration = "";
*/

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
        $scope.formNuPasseport = "" ;
        $scope.formCIN ="";
       /* $scope.formDateDelivrance = "";
        $scope.formLieuDelivrance = "";
        $scope.formNumero = "";
        $scope.formNature = "";
        $scope.formAutority = "";
        $scope.formNumeroDeclaration = "";
        $scope.formDateDeclaration = "";
*/
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
          if($scope.qualite == ""){
            $scope.formQualite = "";
        }else {
            $scope.formQualite = $scope.qualite;
        }

        if($scope.nationalite == ""){
            $scope.formNationalite = "";
        }else {
            $scope.formNationalite = $scope.nationalite;
        }

        if($scope.venteNom == ""){
            $scope.formNom = "";
        }else {
            $scope.formNom = $scope.venteNom;
        }
        if($scope.ventePrenom == ""){
            $scope.formPrenom = "";
        }else {
            $scope.formPrenom = $scope.ventePrenom;
        }

        if($scope.venteResidenceActuelle == ""){
            $scope.formResidenceActuelle = "";
        }else {
            $scope.formResidenceActuelle = $scope.venteResidenceActuelle;
        }
        if($scope.nuPasseport == ""){
            $scope.formNuPasseport = "";
        }else {
            $scope.formNuPasseport = $scope.nuPasseport;
        }

        if($scope.cin == ""){
            $scope.formCIN = "";
        }else {
            $scope.formCIN = $scope.cin;
        }


       /* if($scope.venteNature == "anonyme"){
            $scope.formNature = "";
        }else {
            $scope.formNature = $scope.venteNature;
        }
        
        if($scope.venteNumero == "anonyme"){
            $scope.formNumero = "";
        }else {
            $scope.formNumero = $scope.venteNumero;
        }

        if($scope.venteLieuDelivrance == "anonyme"){
            $scope.formLieuDelivrance = "";
        }else {
            $scope.formLieuDelivrance = $scope.venteLieuDelivrance;
        }

        if($scope.venteDateDelivrance == "anonyme"){
            $scope.formDateDelivrance = "";
        }else {
            $scope.formDateDelivrance = $scope.venteDateDelivrance;
        }

        if($scope.venteAutority == "anonyme"){
            $scope.formAutority = "";
        }else {
            $scope.formAutority = $scope.venteAutority;
        }
        
        if($scope.venteDateDeclaration == "anonyme"){
            $scope.formDateDeclaration = "";
        }else {
            $scope.formDateDeclaration = $scope.venteDateDeclaration;
        }

        if($scope.venteNumeroDeclaration == "anonyme"){
            $scope.formNumeroDeclaration = "";
        }else {
            $scope.formNumeroDeclaration = $scope.venteNumeroDeclaration;
        }*/

        // Affichage du formulaire avec les données filtrés 
        $scope.addClientArea = true;
    }


    $scope.validateClient = function(){
       $scope.enregistrerData = true;
        
    /* 
    * Traitement des donnees
    */
    if($scope.formQualite == ""){
        $scope.qualite = "";
    } else {
        $scope.qualite = $scope.formQualite;
    }

    if($scope.formNationalite == ""){
        $scope.nationalite = "";
    } else {
        $scope.nationalite = $scope.formNationalite;
    }

    if($scope.formNom == ""){
        $scope.venteNom = "";
    } else {
        $scope.venteNom = $scope.formNom;
    }
    if($scope.formPrenom == ""){
        $scope.ventePrenom = "";
    }else {
        $scope.ventePrenom = $scope.formPrenom;
    }

    if($scope.formResidenceActuelle == ""){
        $scope.venteResidenceActuelle = "";
    }else {
        $scope.venteResidenceActuelle = $scope.formResidenceActuelle;
    }

    if($scope.formNuPasseport == ""){
        $scope.nuPasseport = "";
    }else {
        $scope.nuPasseport = $scope.formNuPasseport;
    }

    if($scope.formCIN == ""){
        $scope.cin = "";
    }else {
        $scope.cin = $scope.formCIN;
    }
    //afficher le champ d'enregistrement


    


   /* if($scope.formNature == ""){
        $scope.venteNature = "";
    }else {
        $scope.venteNature = $scope.formNature;
    }
    
    if($scope.formNumero == ""){
        $scope.venteNumero = "anonyme";
    }else {
        $scope.venteNumero = $scope.formNumero;
    }

    if($scope.formLieuDelivrance == ""){
        $scope.venteLieuDelivrance = "anonyme";
    }else {
        $scope.venteLieuDelivrance = $scope.formLieuDelivrance;
    }

    if($scope.formDateDelivrance == ""){
        $scope.venteDateDelivrance = "anonyme";
    }else {
        $scope.venteDateDelivrance = $scope.formDateDelivrance;
    }

    if($scope.formAutority == ""){
        $scope.venteAutority = "anonyme";
    }else {
        $scope.venteAutority = $scope.formAutority;
    }
    
    if($scope.formDateDeclaration == ""){
        $scope.venteDateDeclaration = "anonyme";
    }else {
        $scope.venteDateDeclaration = $scope.formDateDeclaration;
    }

    if($scope.formNumeroDeclaration == ""){
        $scope.venteNumeroDeclaration = "anonyme";
    }else {
        $scope.venteNumeroDeclaration = $scope.formNumeroDeclaration ;
    }
*/
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