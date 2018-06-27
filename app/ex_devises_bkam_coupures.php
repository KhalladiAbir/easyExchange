<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_devises_bkam_coupures extends Model
{
    public function ex_devise()
    {
        return $this->belongsTo('App\ex_devise','id_devise');
    }
}
