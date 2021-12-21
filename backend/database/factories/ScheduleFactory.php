<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Schedule;

class ScheduleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Schedule::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'patient_id' => $this->faker->numberBetween(1,20),
            'schedule_time' => $this->faker->dateTime(),
            'doctor_id' => $this->faker->numberBetween(1,10)
        ];
    }
}
