<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExOperationVentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_operation_ventes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('montant_devise');
            $table->float('cours_applique');
            $table->string('reference_aoc','32');
            $table->string('reference_type_aoc','1');
            $table->integer('id_bordereau_vente');
            $table->integer('id_devise_bkam_change');
            $table->integer('id_client_change');
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
        Schema::dropIfExists('ex_operation_ventes');
    }
}
