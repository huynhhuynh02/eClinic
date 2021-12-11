<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 20),
            'patient_group_id' => $this->faker->numberBetween(1,5),
            'address'=> $this->faker->streetAddress(),
            'phone' => $this->faker->phoneNumber(),
            'fullname' => $this->faker->name(),
            'sex' => $this->faker->numberBetween(0, 2),
            'birthday' => $this->faker->dateTime($max = 'now'),
            'remark' => $this->faker->numberBetween(0, 2),
        ];
    }
}
