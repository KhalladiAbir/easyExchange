<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExDevisesBkamQuotasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_devises_bkam_quotas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->integer('marge_achat');
            $table->integer('marge_vente');
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
        Schema::dropIfExists('ex_devises_bkam_quotas');
    }
}
