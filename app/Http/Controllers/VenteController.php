<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ex_operation_vente;
use App\ex_bordereau_vente;
use App\ex_operation_vente_rect;
use App\ex_bureau_change;
use App\ex_nature_dotation;
use App\ex_qualite_client;
use App\ex_qualite_client_dotation;
use App\ex_pays;
use App\ex_client_vente;


class VenteController extends Controller
{
    public function getOperationsVentes(){
    	return response()->json(ex_operation_vente::all());
    }

    public function getOperationVente($id){
    	$op = ex_operation_vente::where('id',$id)->first();
    	if($op == null){
    		return "0";
    	}
    	return response()->json(['operation_de_vente' => $op]);
    }

    public function addOperationVente(Request $request){

        //recuperation des parametres
        $param = $request->all();

        
        
        $BV = new ex_bordereau_vente();
			$BV ->sequence_bordereau=$param['sequence_bordereau'];
			$BV ->datetime_bordereau= $param['date_operation'];
			$BV ->is_valid=true;
			$BV->heure_bordereau_rect='11/11/1111';

        $BV->save();

	// en cas de rectification !
    /*$OVR = new ex_operation_vente_rect();
        $OVR->montant_devise=$param['montant_devise'];
        $OVR->cours_applique= $param['cours_applique'];
        $OVR->id_bordereau_vente=$BV->id;
        $OVR->id_devise_bkam_change= null;
        $OVR->save();*/
		
		$ND = ex_nature_dotation::where('description', $param['n_dotation'])->first();
        $QC = ex_qualite_client::where('code', $param['qualite'])->first();
        
        $QCD = new ex_qualite_client_dotation();
            $QCD->id_qualite_client= $QC->id;
            $QCD->id_nature_dotation= $ND->id;
            $QCD->save();
		
	$Pays = ex_pays::where('code', $param['nationalite'])->first(); 
	$CV = new ex_client_vente();
            $CV->nom= $param['ca_nom'];
    		$CV->prenom= $param['ca_prenom'];
            $CV->residence= $param['ca_residence'];
            $CV->num_passport= $param['numero_passeport'];
			$CV->num_cni= $param['cin'];
			$CV->num_cim = '111';
			$CV->type_client = '1';
    		$CV->id_qualite_client_dotation= $QCD->id;
    		$CV->id_pays= $Pays->id;

    		$CV->save();

		$operations = $param['operations'];
		$REF = ex_bureau_change::where('num_autorisation_oc', $param['reference'])->first(); 
		foreach($operations as $oper){
			$OV = new ex_operation_vente();
			$OV->montant_devise=$oper['montant'];
            $OV->cours_applique= $oper['courApp'];
			$OV->reference_aoc=$REF->num_autorisation_oc;
			$OV->reference_type_aoc='2';
			$OV->id_bordereau_vente=$BV->id;
			$OV->id_devise_bkam_change= 0;
			/*vente*/$OV->id_client_change=$CV->id;

        	$OV->save();
		}	

        

           

        
        


        

    }


	public function getLastSequenceBordereauVente(){
		$bordereau = ex_bordereau_vente::all()->last();
		$id = $bordereau->sequence_bordereau;
		return response()->json(['idbordereau'=>$id]);
	}

    public function getNatureDotation(){
    	$pays = ex_nature_dotation::all();
    	$codes = array();
    	foreach ($pays as $p) {
    		//$unPays = array('code' => $p['code'] , 'description' => $p['description'] ); for further maquillage
    		array_push($codes,$p['description']);
    	}
    	return response()->json($codes);
    }

    public function getReferenceAutorisation(){
    	$change = ex_bureau_change::all();
    	$autorisation = array();
    	foreach ($change as $p) {
    		//$unPays = array('code' => $p['code'] , 'description' => $p['description'] ); for further maquillage
    		array_push($autorisation,$p['num_autorisation_oc']);
    	}
    	return response()->json($autorisation);
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

    public function getPays(){
    	$pays = ex_pays::all();
    	$codes = array();
    	foreach ($pays as $p) {
    		//$unPays = array('code' => $p['code'] , 'description' => $p['description'] ); for further maquillage
    		array_push($codes,$p['code']);
    	}
    	return response()->json($codes);
	}
	
	
    
}
