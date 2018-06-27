<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExOperationAchatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_operation_achats', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('montant_devise');
            $table->integer('cours_applique');
            $table->integer('id_bordereau_achat');
            $table->integer('id_nature_operation');
            $table->integer('id_pays');
            $table->integer('id_nature_payement');
            $table->integer('id_devise_bkam_change');
            $table->integer('id_client_achat_pi');
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
        Schema::dropIfExists('ex_operation_achats');
    }
}
