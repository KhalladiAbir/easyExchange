<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\ex_operation_achat;
use App\ex_client_achat_pi;
use App\ex_client_achat;
use App\ex_piece_identite;
use App\ex_bordereau_achat;
use App\ex_nature_payement;
use App\ex_nature_operation;
use App\ex_pays;
use App\ex_devise;
use App\ex_qualite_client;



use Illuminate\Http\Request;

class AchatController extends Controller
{
    public function getOperationsAchats(){
    	return response()->json(ex_operation_achat::all());
    }

    public function getOperationAchat($id){
    	$op = ex_operation_achat::where('id',$id)->first();
    	if($op == null){
    		return "0";
    	}
    	return response()->json(['operation_d_achat' => $op]);
    }

    public function addOperationAchat(Request $request){

    	//recuperation des parametres
    	$param = $request->all();

    	

    	$BA = new ex_bordereau_achat();
			$BA ->sequence_bordereau=$param['sequence_bordereau'];
			$BA ->datetime_bordereau= $param['date_operation'];
			$BA ->is_valid=true;
			$BA->heure_bordereau_rect="11/11/1111";

		$BA->save();






		$pays = ex_pays::where('code',$param['nationality'])->first();

		$NP = ex_nature_payement::where('description',$param['nature_payement'])->first();
		
	
		$operationn = $param['operations'];
		
		foreach($operationn as $oper){

				
			 if($oper['montant'] > 10000){
				$idPI = ex_piece_identite::where('code',$param['pi_nature'])->first();
				$CA = new ex_client_achat();
            	$CA->nom= $param['ca_nom'];
    			$CA->prenom= $param['ca_prenom'];
    			$CA->residence= $param['ca_residence'];
    			$CA->numero_declaration= $param['numero_declaration'];
				$CA->date_declaration= $param['date_declaration'];
				$CA->save();
				
				 
	
				$CAPI = new ex_client_achat_pi();
				$CAPI ->numero=$param['pi_numero'];
				$CAPI ->date_delivrance=$param['pi_date_delivrance'];
				$CAPI ->lieu_delivrance=$param['pi_lieu_delivrance'];
				$CAPI ->autorite_delivrante=$param['pi_autorite_delivrante'];
				$CAPI ->id_client_achat=$CA->id;
				$CAPI ->id_piece_identite=$idPI->id;
				$CAPI->save();
				
				$OA = new ex_operation_achat();
				$OA->montant_devise=$oper['montant'];
			
				$OA->cours_applique=$oper['courApp'] ;
				$OA->id_bordereau_achat=$BA->id;
				$OA->id_nature_operation= 1;
				$OA->id_pays = $pays->id;
				$OA->id_nature_payement = $NP->id;
				$OA->id_devise_bkam_change= 1;
				$OA->id_client_achat_pi=$CAPI->id;
				
				$OA->save();
			}else{
				$OA = new ex_operation_achat();
				$OA->montant_devise=$oper['montant'];
			
				$OA->cours_applique=$oper['courApp'] ;
				$OA->id_bordereau_achat=$BA->id;
				//$OA->id_nature_operation= $param['nature_op'];
				$OA->id_nature_operation=1;
				$OA->id_pays = $pays->id;
				$OA->id_nature_payement = $NP->id;
				$OA->id_devise_bkam_change= 1;
				$OA->id_client_achat_pi=0;
				$OA->save();
				 
			}
		}


    	return response()->json(['success'=>true]);
	}
	

	public function getLastSequenceBordereau(){
		$bordereau = ex_bordereau_achat::all()->last();
		$id = $bordereau->sequence_bordereau;
		return response()->json(['idbordereau'=>$id]);
	}


    public function getPays(){
    	$pays = ex_pays::all();
    	$codes = array();
    	foreach ($pays as $p) {
    		//$unPays = array('code' => $p['code'] , 'description' => $p['description'] ); for further maquillage
    		array_push($codes,$p['code']);
    	}
    	return response()->json($codes);
    }

    public function getNatureOperation(){
    	$NO = ex_nature_operation::all();
    	$natures = array();
    	foreach ($NO as $p) {
    		array_push($natures,$p['description']);
    	}
    	return response()->json($natures);
    	//return response()->json($NO);
    }

    public function getNaturePayement(){
    	$N = ex_nature_payement::all();
    	$natures = array();
    	foreach ($N as $p) {
    		array_push($natures,$p['description']);
    	}
    	return response()->json($natures);
    }

    public function getDevises(){
    	$N = ex_devise::all();
    	$dev = array();
    	foreach ($N as $p) {
    		array_push($dev,$p['code']);
    	}
    	return response()->json($dev);
    }

    public function getQualiteClient(){
    	$Q = ex_qualite_client::all();
    	$qc = array();
    	foreach ($Q as $p) {
    		array_push($qc,$p['code']);
    	}
    	return response()->json($qc);
    }

    public function getNaturePI(){
    	$Q = ex_piece_identite::all();
    	$qc = array();
    	foreach ($Q as $p) {
    		array_push($qc,$p['code']);
    	}
    	return response()->json($qc);
    }
       
}
