<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExDevisesBkamChangesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_devises_bkam_changes', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('date_chante');
            $table->integer('facteur');
            $table->integer('vente_pr_banque');
            $table->integer('cours_central');
            $table->integer('achat_clientelle');
            $table->integer('cours_achat');
            $table->integer('cours_vente');
            $table->integer('id_devise_bkam');
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
        Schema::dropIfExists('ex_devises_bkam_changes');
    }
}
