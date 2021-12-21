<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Patient;

class PatientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Patient::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(11,30),
            'patient_group_id' => $this->faker->numberBetween(1,5),
            'address' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'fullname' => $this->faker->name(),
            'sex' => $this->faker->boolean(),
            'birthday' => $this->faker->dateTime(),
        ];
    }
}
