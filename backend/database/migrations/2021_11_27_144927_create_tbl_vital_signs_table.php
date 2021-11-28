<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblVitalSignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_vital_signs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('prescription_id');
            $table->float('heart_vessels',6,2)->nullable();
            $table->float('HA',6,2)->nullable();
            $table->float('ND',6,2)->nullable();
            $table->float('weight',6,2)->nullable();
            $table->float('height',6,2)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('prescription_id')->references('id')->on('tbl_prescriptions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_vital_signs');
    }
}
