<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblClinics extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_clinics', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
			$table->string('address');
			$table->string('logo');
            $table->boolean('active_flag')->default(1);
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
        Schema::dropIfExists('tbl_clinics');
    }
}
