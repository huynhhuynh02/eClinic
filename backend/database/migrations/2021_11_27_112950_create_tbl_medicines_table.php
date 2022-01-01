<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblMedicinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_medicines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('unit_id');
            $table->unsignedBigInteger('cate_id');
            $table->string('name');
            $table->integer('user_id');
            $table->integer('quantity')->nullable();
            $table->integer('price')->nullable();
            $table->date('expired_date')->nullable();
            $table->text('description')->nullable();
            $table->text('composition')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('unit_id')->references('id')->on('tbl_units')->onDelete('cascade');
            $table->foreign('cate_id')->references('id')->on('tbl_category_medicine')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_medicines');
    }
}
