<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExClientVentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_client_ventes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom','32');
            $table->string('prenom','32');
            $table->string('residence','256');
            $table->string('num_passport','16');
            $table->string('num_cni','16');
            $table->string('num_cim','16');
            $table->string('type_client','1');
            $table->integer('id_qualite_client_dotation');
            $table->integer('id_pays');
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
        Schema::dropIfExists('ex_client_ventes');
    }
}
