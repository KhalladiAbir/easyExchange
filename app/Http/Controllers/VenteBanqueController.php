<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ex_operation_cession;
use App\ex_banques;

class VenteBanqueController extends Controller
{
    public function getCessionOperations(){
    	return response()->json(ex_operation_cession::all());
    }

    public function getCessionOperation($id){
    	$op = ex_operation_cession::where('id',$id)->first();
    	if($op == null){
    		return response()->json(['cession'=> null]);
    	}
    	return response()->json(['cession' => $op]);
    }

    public function addCessionOperation(Request $request){
    	//Recupération des paramètres
    	$param = $request->all();

    	//Banque
    	$id_banque = ex_banques::where('description',$param['nomInter'])->first()->id;

    	//devise_bkam_change
    	$id_devise_bkam_change = 0; //pour le moment
        $operationn = $param['operations'];
		
		foreach($operationn as $oper){

    	//Creation d'une opération de cession
    	$cession = new ex_operation_cession();
    		$cession->date_cession = $param['date_operation'];
    		$cession->date_recu = $param['dateRecu'];
    		$cession->time_save_cession = $param['date_operation'];
    		$cession->montant_devise = $oper['montant'];
    		$cession->cours_applique = $oper['coursApp'];
    		$cession->reference = $param['reference'];
    		$cession->attachement_file_name ='file name';
    		$cession->id_banque = $id_banque;
    		$cession->id_devise_bkam_change = 0;

        $cession->save();
        }
    	
    	return response()->json(['success'=>true]);	
    	
    }
    public function getBanques(){
        $banques = ex_banques::all();

        $bank = array();
        foreach ($banques as $p) {
            array_push($bank,$p['description']);
        }
        return response()->json($bank);
    }

    
}
