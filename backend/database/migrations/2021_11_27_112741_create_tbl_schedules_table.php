<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patient_id');
            $table->timestamp('schedule_time');
            $table->string('description')->nullable();
            $table->integer('status')->nullable();
            $table->integer('type')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('patient_id')->references('id')->on('tbl_patients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_schedules');
    }
}
