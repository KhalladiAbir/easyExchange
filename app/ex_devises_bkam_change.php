<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_devises_bkam_change extends Model
{
    public function ex_devise_bkam()
    {
        return $this->belongsTo('App\ex_devises_bkam_quotas','id_devise_bkam');
    }
}
