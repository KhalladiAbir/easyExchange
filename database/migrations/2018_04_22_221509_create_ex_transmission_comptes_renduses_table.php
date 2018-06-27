<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExTransmissionComptesRendusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_transmission_comptes_renduses', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('date_transmission');
            $table->dateTime('datetime_upload');
            $table->integer('id_compte_rendu');
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
        Schema::dropIfExists('ex_transmission_comptes_renduses');
    }
}
