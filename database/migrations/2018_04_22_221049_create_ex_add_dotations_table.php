<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExAddDotationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_add_dotations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_nature_dotation');
            $table->integer('id_dotation_added');
            $table->integer('id_qualite_client');
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
        Schema::dropIfExists('ex_add_dotations');
    }
}
