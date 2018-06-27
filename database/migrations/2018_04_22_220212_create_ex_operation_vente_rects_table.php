<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExOperationVenteRectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_operation_vente_rects', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('montant_devise');
            $table->float('cours_applique');
            $table->integer('id_bordereau_vente');
            $table->integer('id_devises_bkam_change');
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
        Schema::dropIfExists('ex_operation_vente_rects');
    }
}
