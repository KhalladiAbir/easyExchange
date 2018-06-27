<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExDevisesBkamCaissesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_devises_bkam_caisses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('montant_devise');
            $table->dateTime('montant_initial');
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
        Schema::dropIfExists('ex_devises_bkam_caisses');
    }
}
