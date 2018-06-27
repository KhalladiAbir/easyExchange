<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_pays_flag extends Model
{
    public function ex_pays()
    {
        return $this->belongsTo('App\ex_pays','id_pays');
    }

}
