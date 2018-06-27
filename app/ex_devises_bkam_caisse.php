<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_devises_bkam_caisse extends Model
{
    public function ex_devise_bkam_coupure()
    {
        return $this->belongsTo('App\ex_devises_bkam_coupure','id_devise_bkam_coupure');
    }
}
