
/* var listeDevices = [
    {"ID":1,"flag":"assets/images/uefa.jpg","statut":true},
    {"ID":2,"flag":"assets/images/bahren.jpg","statut":false},
    {"ID":3,"flag":"assets/images/maroc.jpg","statut":true},
    {"ID":4,"flag":"assets/images/emarat.jpg","statut":false},
    {"ID":5,"flag":"assets/images/canada.jpg","statut":true}
] */
    /* 
    {"ID":6,"flag":"assets/images/usa.jpg",},
    {"ID":7,"flag":"assets/images/japan.jpg",},
    {"ID":8,"flag":"assets/images/saudia.jpg","device":"1 RYAL SAOUDIA","venteBanc":"6","coursAchat":"100","coursVente":"11","statut":true},
    {"ID":9,"flag":"assets/images/oman.jpg","device":"1 RYAL OMANI","venteBanc":"6","coursAchat":"100","coursVente":"11","statut":false},
    {"ID":10,"flag":"assets/images/suisse.jpg","device":"1 FRANC SUISSE","venteBanc":"6","coursAchat":"100","coursVente":"11","statut":true},

 */
app.controller("coursCtrl",function($scope,$window,$http,$rootScope){
  // Traitement de modification dans le tableau
  $scope.editDeviceVente = function(obj){
    var stock = obj.target.textContent;
    obj.target.style.display = "none";
    
    obj.target.parentNode.parentNode.querySelector('.device-vente-input').style.display = "inline";
    obj.target.parentNode.parentNode.querySelector('.device-vente-input .champs').style.display = "inline";
    obj.target.parentNode.parentNode.querySelector('.device-vente-input .form').style.display = "inline";
    obj.target.parentNode.parentNode.querySelector('.device-vente-input .champs').value = stock;
}

$scope.enterValue = function(e){
    if(e.keyCode == 13){  
        var stock = e.target.value;
        var id = e.target.parentNode.querySelector('.id').value;

        if(!isNaN(stock)){
            e.target.style.display = "none";
            e.target.parentNode.style.display = "none";
            e.target.parentNode.parentNode.style.display = "none";
            e.target.parentNode.parentNode.parentNode.querySelector('.device-vente-value .data').style.display = "inline";
            e.target.parentNode.parentNode.parentNode.querySelector('.device-vente-value .data').innerHTML = stock;

            // Enrigistrer les donnes dans le fichier excell ou Bdd

        }else {
            alert("Veuiller inserer un chiffre valide");
        }

        var newval1 = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".mn").textContent;
        var newval2 = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".vs").textContent;
        var newval3 = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".vn").textContent;

        
        
        $http.post("api/updateCours",{
            
            "id":id,
            "val1":newval2,
            "val2":newval3,
            "val3":newval1

        }).then(function(res){

        })
    }
}

})