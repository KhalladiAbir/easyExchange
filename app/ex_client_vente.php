<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_client_vente extends Model
{
    public function ex_qualite_client_dotation()
    {
        return $this->belongsTo('App\ex_qualite_client_dotation','id_qualite_client_dotation');
    }
    public function ex_pays()
    {
        return $this->belongsTo('App\ex_pays','id_pays');
    }
}
