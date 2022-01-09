<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

class ScheduleFactory extends Factory
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
            'patient_id' => Patient::factory(),
            'schedule_time' => $this->faker->dateTime(),
            'description' => $this->faker->text(),
            'status' => rand(0,1),
            'type' => rand(0,1)
        ];
    }
}
