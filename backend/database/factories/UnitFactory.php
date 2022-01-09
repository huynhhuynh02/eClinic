<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $unit = ['Viên', 'Hộp' ,'Vỉ', 'Lọ', 'Chai', 'Ống'];
        return [
            //
            'name' => $unit[rand(0, count($unit) -1)],
        ];
    }
}
