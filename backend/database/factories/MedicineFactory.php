<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Unit;
use App\Models\User;
use DateTime;

class MedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            'unit_id' => Unit::factory(),
            'cate_id' => Category::factory(),
            'name' => $this->faker->bothify('Thuốc ???? ####'),
            'user_id' => User::factory(),
            'quantity' => rand(1,100),
            'expired_date' => new DateTime('now'),
            'description' => $this->faker->paragraph(),
            'composition' => $this->faker->paragraph()
        ];
    }
}
