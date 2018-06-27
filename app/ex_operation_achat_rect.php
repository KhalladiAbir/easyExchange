<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_operation_achat_rect extends Model
{
    public function ex_bordereau_achat()
    {
        return $this->belongsTo('App\ex_bordereau_achat','id_bordereau_achat');
    }

    public function ex_devises_bkam_change()
    {
        return $this->belongsTo('App\ex_devises_bkam_change','id_devise_bkam_change');
    }
}
