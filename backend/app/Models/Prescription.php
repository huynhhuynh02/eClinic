<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $table = "tbl_prescriptions";
    
    public function user() 
    {
        return $this->hasOne(User::class,'user_id');
    }

    public function patient() 
    {
        return $this->hasOne(Patient::class,'patient_id');
    }
    
    public function prescription_details() 
    {
        return $this->belongsTo(PrescriptionDetail::class);
    }
}
