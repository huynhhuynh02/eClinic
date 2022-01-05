<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Date;

class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $now = new \DateTime('now');
        $date = $now->format('YmdHis');
        return [
            //
            'pid' => sprintf('%04d',rand(1, 10)).$date,
            'user_id' => User::factory(),
            'address' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'fullname' => $this->faker->name(),
            'sex' => $this->faker->title(),
            'birthday' => $this->faker->date(),
            'remark' => $this->faker->text()
        ];
    }
}
