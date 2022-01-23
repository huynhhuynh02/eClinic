<?php

namespace App\Models;

use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "tbl_patients";

    /**
     * Get the comments for the blog post.
     */
    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }

    public function city()
    {
        return $this->hasOne(City::class);
    }

    public function districts()
    {
        return $this->hasOne(District::class);
    }

    public function ward()
    {
        return $this->hasOne(Ward::class);
    }
}
