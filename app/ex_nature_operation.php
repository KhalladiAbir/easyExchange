<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_nature_operation extends Model
{
    public function ex_qualite_client()
    {
        return $this->belongsTo('App\ex_qualite_client','id_qualite_client');
    }
}
