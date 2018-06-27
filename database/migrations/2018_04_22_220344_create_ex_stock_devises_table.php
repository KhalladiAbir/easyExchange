<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExStockDevisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ex_stock_devises', function (Blueprint $table) {
            $table->increments('id');
            $table->string('devise',50);
            $table->integer('montant');
            $table->string('cours_applique');
            $table->dateTime('datetime_stock');
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
        Schema::dropIfExists('ex_stock_devises');
    }
}
