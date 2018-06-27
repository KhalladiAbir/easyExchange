<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExClientAchatPisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_client_achat_pis', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('numero');
            $table->string('date_delivrance');
            $table->string('lieu_delivrance');
            $table->string('autorite_delivrante');
            $table->integer('id_client_achat');
            $table->integer('id_piece_identite');
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
        Schema::dropIfExists('ex_client_achat_pis');
    }
}
