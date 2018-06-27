<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_client_achat_pi extends Model
{
    public function ex_client_achat()
    {
        return $this->belongsTo('App\ex_client_achat','id_client_achat');
    }

    public function ex_piece_identite()
    {
        return $this->belongsTo('App\ex_piece_identite','id_piece_identite');
    }
}
