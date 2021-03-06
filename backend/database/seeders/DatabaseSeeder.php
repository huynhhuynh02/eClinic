<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(1)->create();
        \App\Models\Unit::factory(100)->create();
        \App\Models\Category::factory(100)->create();
        \App\Models\Medicine::factory(100)->create();
        // \App\Models\Patient::factory(100)->create();
        // \App\Models\Schedule::factory(100)->create();
        \App\Models\DealineConfig::factory(1)->create();
    }
}
