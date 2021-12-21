<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0; $i < 10; $i++ ){
            DB::table('tbl_category_medicine')->insert([
                'user_id' => '1',
                'code' => 'code'.$i,
                'name' => 'category'.$i,
                'parent_id' => null,
            ]);
        }
    }
}
