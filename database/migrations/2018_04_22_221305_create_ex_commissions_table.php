<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExCommissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_commissions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('stock_initial');
            $table->integer('stock_final');
            $table->integer('total_achats');
            $table->integer('total_ventes');
            $table->dateTime('datetime_commission');
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
        Schema::dropIfExists('ex_commissions');
    }
}
