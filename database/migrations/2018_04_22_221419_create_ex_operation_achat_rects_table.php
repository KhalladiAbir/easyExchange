<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExOperationAchatRectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_operation_achat_rects', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('montant_devise');
            $table->integer('cours_applique');
            $table->integer('id_bordereau_achat');
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
        Schema::dropIfExists('ex_operation_achat_rects');
    }
}
