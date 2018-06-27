<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExOperationCessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_operation_cessions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('date_cession');
            $table->string('date_recu');
            $table->string('time_save_cession');
            $table->integer('montant_devise');
            $table->integer('cours_applique');
            $table->string('reference');
            $table->string('attachement_file_name');
            $table->integer('id_banque');
            $table->integer('id_devise_bkam_change');
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
        Schema::dropIfExists('ex_operation_cessions');
    }
}
