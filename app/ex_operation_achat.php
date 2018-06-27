<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_operation_achat extends Model
{
    public function ex_bordereau_achat()
    {
        return $this->belongsTo('App\ex_bordereau_achat','id_bordereau_achat');
    }

    public function ex_nature_operation()
    {
        return $this->belongsTo('App\ex_nature_operation','id_nature_operation');
    }

    public function ex_pays()
    {
        return $this->belongsTo('App\ex_pays','id_pays');
    }

    public function ex_nature_payement()
    {
        return $this->belongsTo('App\ex_nature_payement','id_nature_payement');
    }

    public function ex_devises_bkam_change()
    {
        return $this->belongsTo('App\ex_devises_bkam_change','id_devise_bkam_change');
    }

    public function ex_client_achat_pi()
    {
        return $this->belongsTo('App\ex_client_achat_pi','id_client_achat_pi');
    }
}
