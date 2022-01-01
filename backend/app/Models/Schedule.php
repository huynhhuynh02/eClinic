<?php

namespace App\Models;

<<<<<<< HEAD
=======
use App\Models\Patient;
>>>>>>> develop
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;
    protected $table = "tbl_schedules";

    public function patient()
    {
        return $this->hasOne(Patient::class, 'id', 'patient_id');
    }

    public function doctor()
    {
        return $this->hasOne(Doctor::class, 'id', 'doctor_id');
    }
}
