<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_operation_cession extends Model
{
    public function ex_banque()
    {
        return $this->belongsTo('App\ex_banques','id_banque');
    }

    public function ex_devises_bkam_change()
    {
        return $this->belongsTo('App\ex_devises_bkam_change','id_devise_bkam_change');
    }
}
