<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExBordereauVentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_bordereau_ventes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('sequence_bordereau','11');
            $table->string('datetime_bordereau');
            $table->boolean('is_valid')->default(true);
            $table->string('heure_bordereau_rect');
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
        Schema::dropIfExists('ex_bordereau_ventes');
    }
}
