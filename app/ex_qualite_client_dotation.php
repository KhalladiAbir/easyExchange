<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_qualite_client_dotation extends Model
{
    public function ex_qualite_client()
    {
        return $this->belongsTo('App\ex_qualite_client','id_qualite_client');
    }

    public function ex_nature_dotation()
    {
        return $this->belongsTo('App\ex_nature_dotation','id_nature_dotation');
    }
}
