<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPrescriptionDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_prescription_details', function (Blueprint $table) {
            $table->unsignedBigInteger('medicines_id');
            $table->unsignedBigInteger('prescription_id');
            $table->integer('amount')->nullable();
            $table->integer('remark')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('medicines_id')->references('id')->on('tbl_medicines')->onDelete('cascade');
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
        Schema::dropIfExists('tbl_prescription_details');
    }
}
