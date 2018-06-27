app.config(["$routeProvider",
    function ($routeProvider) {
        $routeProvider
            .when("/cours-charge",{
                controller:"coursCtrl",
                templateUrl: "views/cours-charge.html"
            })

            .when("/achat-client",{
                controller: "achatCtrl",
                templateUrl: "views/achat-client.html",  
            })

            .when("/vente-client",{
                controller: "venteCtrl",
                templateUrl: "views/vente-client.html"
            })

            .when("/vente-banque",{
                controller:"venteBankCtrl",
                templateUrl: "views/vente-banque.html"
            })

            .when("/comptes-rendus",{
                controller:"comptesRendusCtrl",
                templateUrl: "views/comptes-rendus.html"
            })
            .otherwise({
                redirectTo : "views/otherwise.html"
            })
    }])