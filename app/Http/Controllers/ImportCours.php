<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Excel;
use DB;

class ImportCours extends Controller
{
    /**
     * Import file into database Code
     *
     * @var array
     */
	 public function importExcel()
	{
/*

		
			$path = "C:\Users\pc\Desktop\demo.ods";


			$dataa = Excel::load($path, function($reader) {})->get();


			if(!empty($dataa) && $dataa->count()){


				foreach ($dataa->toArray() as $key => $value) {
					if(!empty($value)){
                        
						foreach ($value as $v) {		
							$insert[] = ['devises' => $v['devises'],'vente_banque' => $v['vente_banque'], 'cours_achat' => $v['cours_achat'], 'cours_vente' => $v['cours_vente']];
						}
					}
				}

				
				if(!empty($insert)){
                    $i = 4;
                    foreach ($insert as $ins) {
                            
                            DB::table('excel')->where('id', '=', $i+1)->update(['devises' => $ins['devises'] ,'vente_banque' => $ins['vente_banque'] ,'cours_achat' => $ins['cours_achat'] ,'cours_vente' => $ins['cours_vente'] ]);
                            $i++;
                    }
				}


			}


		

 */
		
    }
    public function getDataExcel(){
        $data = DB::table('excel')->get()->all();
        return response()->json(['data' => $data]);
    }

    public function updateCours(Request $request){
        $id = $request['id'];

        DB::table('excel')->where('id',$id)->update([
            'vente_banque'=>$request['val2'],
            'cours_achat'=>$request['val3'],
            'cours_vente'=>$request['val1']    
        ]);
        

    }


}
