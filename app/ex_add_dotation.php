<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ex_add_dotation extends Model
{
    public function ex_nature_dotation()
    {
        return $this->belongsTo('App\ex_nature_dotation','id_nature_dotation');
    }
    public function ex_dotation_added()
    {
        return $this->belongsTo('App\ex_dotation_added','id_dotation_added');
    }
    public function ex_qualite_client()
    {
        return $this->belongsTo('App\ex_qualite_client','id_qualite_client');
    }
}
