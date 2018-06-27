<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ex_operation_achat;
use App\ex_operation_achat_rect;
use App\ex_bordereau_achat;

use App\ex_operation_vente;
use App\ex_operation_vente_rect;
use App\ex_bordereau_vente;

use App\ex_operation_cession;

use App\ex_nature_operation;
use App\ex_pays;
use App\ex_nature_payement;
use App\ex_piece_identite;
use App\ex_qualite_client;
use DB;
use App\ex_client_achat;
use App\ex_client_vente;

class ComptesRendusController extends Controller
{
	public function getOperationsAchats(Request $request){
		//Recupération des paramètres
    	$param = $request->all();

    	//Affectation de l'information temporelle
    	$month = $param['month'];

    	//Recherche des opération d'achat pour ce mois
		$opAchat = DB::table('ex_operation_achats')->where('created_at','like', '%-' .$month. '-%')->get();
		
    	
    	//Génération des lignes du tableau (opérations)
    	$array = array();
    	foreach ($opAchat as $achat) {
    		//On reprend les informations nécessaires
    		$date = $achat->created_at;
    		$Bordereau = ex_bordereau_achat::where('id',$achat->id_bordereau_achat)->first();
			$numBordereau = $Bordereau->sequence_bordereau;
			$devise = $achat->id_devise_bkam_change;
    		$montant = $achat->montant_devise;
    		$contrevaleur = $achat->cours_applique * $achat->montant_devise;
    		$cours = $achat->cours_applique;
    		
    		$op = ['date' => $date,
    			'bordereau' => $numBordereau,
    			'devise' => $devise,
    			'montant' => $montant,
    			'cours' => $cours,
    			'valeur' => $contrevaleur,
    		];
    		array_push($array, $op);
    		
    	}
		if(count($array)==0){
			return response()->json('KO');	
		}
    	return response()->json($array);
	}

	public function getOperationsVentes(Request $request){
		//Recupération des paramètres
    	$param = $request->all();

    	//Affectation de l'information temporelle
    	$month = $param['month'];

    	//Recherche des opération d'achat pour ce mois
    	$opAchat = ex_operation_vente::where('created_at','like', '%-' .$month. '-%')->get();
    	
    	//Génération des lignes du tableau (opérations)
    	$array = array();
    	foreach ($opAchat as $key => $achat) {
    		//On reprend les informations nécessaires
    		$date = $achat->created_at->format("d/m/Y");
    		$Bordereau = ex_bordereau_vente::where('id',$achat->id_bordereau_vente)->first();
			$numBordereau = $Bordereau->sequence_bordereau;
			$devise = $achat->id_devise_bkam_change;
    		$montant = $achat->montant_devise;
    		$contrevaleur = $achat->cours_applique * $achat->montant_devise;
    		$cours = $achat->cours_applique;
    		
    		$op = ['date' => $date,
    			'bordereau' => $numBordereau,
    			'devise' => $devise,
    			'montant' => $montant,
    			'cours' => $cours,
    			'valeur' => $contrevaleur,
    		];
    		array_push($array, $op);
    		
    	}

    	return response()->json($array);
	}

	public function getOperationsCessions(Request $request){
		//Recupération des paramètres
    	$param = $request->all();

    	//Affectation de l'information temporelle
    	$month = $param['month'];

    	//Recherche des opération d'achat pour ce mois
    	$opAchat = ex_operation_cession::where('created_at','like', '%-' .$month. '-%')->get();
    	
    	//Génération des lignes du tableau (opérations)
    	$array = array();
    	foreach ($opAchat as $key => $achat) {
    		//On reprend les informations nécessaires
    		$date = $achat->created_at->format("d/m/Y");
    		
			$numBordereau = "---";
			$devise = $achat->id_devise_bkam_change;
    		$montant = $achat->montant_devise;
    		$contrevaleur = $achat->cours_applique * $achat->montant_devise;
    		$cours = $achat->cours_applique;
    		
    		$op = ['date' => $date,
    			'bordereau' => $numBordereau,
    			'devise' => $devise,
    			'montant' => $montant,
    			'cours' => $cours,
    			'valeur' => $contrevaleur,
    		];
    		array_push($array, $op);
    		
    	}

    	return response()->json($array);
	}
	
	public function getJournal(Request $request){
		//Recupération des paramètres
    	$param = $request->all();

    	//Affectation de l'information temporelle
    	$date = $param['date'];

    	//Recherche des opération d'achat pour ce mois
		$opAchat = ex_operation_achat::where('created_at','like',$date. ' %')->get();
		$opVente = ex_operation_vente::where('created_at','like', $date. ' %')->get();
		$opCession = ex_operation_cession::where('created_at','like', $date. ' %')->get();
    	
    	//Génération des lignes du tableau (opérations)
		$array = array();
		foreach ($opAchat as $achat) {
    		//On reprend les informations nécessaires
    		$date = $achat->created_at->format("d/m/Y");
    		$Bordereau = ex_bordereau_achat::where('id',$achat->id_bordereau_achat)->first();
			$numBordereau = $Bordereau->sequence_bordereau;
			$devise = $achat->id_devise_bkam_change;
    		$montant = $achat->montant_devise;
    		$contrevaleur = $achat->cours_applique * $achat->montant_devise;
    		$cours = $achat->cours_applique;
    		
    		$op = ['date' => $date,
    			'bordereau' => $numBordereau,
    			'devise' => $devise,
    			'montant' => $montant,
    			'cours' => $cours,
    			'valeur' => $contrevaleur,
    		];
    		array_push($array, $op);
    		
		}
		foreach ($opVente as $key => $achat) {
    		//On reprend les informations nécessaires
    		$date = $achat->created_at->format("d/m/Y");
    		$Bordereau = ex_bordereau_vente::where('id',$achat->id_bordereau_vente)->first();
			$numBordereau = $Bordereau->sequence_bordereau;
			$devise = $achat->id_devise_bkam_change;
    		$montant = $achat->montant_devise;
    		$contrevaleur = $achat->cours_applique * $achat->montant_devise;
    		$cours = $achat->cours_applique;
    		
    		$op = ['date' => $date,
    			'bordereau' => $numBordereau,
    			'devise' => $devise,
    			'montant' => $montant,
    			'cours' => $cours,
    			'valeur' => $contrevaleur,
    		];
    		array_push($array, $op);
    		
    	}
    	foreach ($opCession as $key => $achat) {
    		//On reprend les informations nécessaires
    		$date = $achat->created_at->format("d/m/Y");
    		
			$numBordereau = "---";
			$devise = $achat->id_devise_bkam_change;
    		$montant = $achat->montant_devise;
    		$contrevaleur = $achat->cours_applique * $achat->montant_devise;
    		$cours = $achat->cours_applique;
    		
    		$op = ['date' => $date,
    			'bordereau' => $numBordereau,
    			'devise' => $devise,
    			'montant' => $montant,
    			'cours' => $cours,
    			'valeur' => $contrevaleur,
    		];
    		array_push($array, $op);
    		
    	}

    	return response()->json($array);
	}


}
