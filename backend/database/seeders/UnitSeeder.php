<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0; $i < 5; $i++ ){
            DB::table('tbl_units')->insert([
                'name' => 'unit'.$i,
                'parent_id' => null,
            ]);
        }
    }
}
