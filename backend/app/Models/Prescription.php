<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $table = "tbl_prescriptions";

    public function patient() 
    {
        return $this->belongsTo(Patient::class);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
    
    public function prescription_details() 
    {
        return $this->hasMany(PrescriptionDetail::class);
    }
}
