<?php

namespace App\Models;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "tbl_schedules";

    /**
    * Get the user that owns the phone.
    */
    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    
}
