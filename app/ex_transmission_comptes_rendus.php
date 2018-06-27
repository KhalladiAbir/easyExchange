<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_transmission_comptes_rendus extends Model
{
    public function ex_compte_rendu()
    {
        return $this->belongsTo('App\ex_compte_rendu','id_compte_rendu');
    }
}
