<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_operation_vente_rect extends Model
{
    public function ex_bordereau_vente()
    {
        return $this->belongsTo('App\ex_bordereau_vente','id_bordereau_vente');
    }

    public function ex_devises_bkam_change()
    {
        return $this->belongsTo('App\ex_devises_bkam_change','id_devise_bkam_change');
    }
}
