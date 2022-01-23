<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePatientTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tbl_patients', function (Blueprint $table) {
            $table->string('city')->nullable();
            $table->string('district')->nullable();
            $table->string('ward')->nullable();
            $table->foreign('city')->references('code')->on('cities')->onDelete('cascade');
            $table->foreign('district')->references('code')->on('districts')->onDelete('cascade');
            $table->foreign('ward')->references('code')->on('wards')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_patients', function (Blueprint $table) {
            $table->dropColumn('city');
            $table->dropColumn('district');
            $table->dropColumn('ward');
        });
    }
}
