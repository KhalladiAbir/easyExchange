<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExBordereauAchatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_bordereau_achats', function (Blueprint $table) {
            $table->increments('id');
            $table->string('sequence_bordereau');
            $table->string('datetime_bordereau');
            $table->boolean('is_valid');
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
        Schema::dropIfExists('ex_bordereau_achats');
    }
}
