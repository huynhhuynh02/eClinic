<?php

namespace Database\Factories;

use DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Date;

class DealineConfigFactory extends Factory
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
            'date' => date_format(new DateTime('now'), 'Y-m-d'),
            'user_id' => 1,
            'open_time' => '08:00:00',
            'close_time' => '18:00:00',
            'full_day' => false,
            'is_default' => true
        ];
    }
}
