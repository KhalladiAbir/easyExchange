<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExDevisesBkamCaisseStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_devises_bkam_caisse_states', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('montant_devise');
            $table->dateTime('date_save_caisse');
            $table->dateTime('time_save_caisse');
            $table->integer('id_devise_bkam_coupure');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ex_devises_bkam_caisse_states');
    }
}
