<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrescriptionDetail extends Model
{
    use HasFactory;

    protected $table = "tbl_prescription_details";

    public function prescription() 
    {
        return $this->belongsTo(Prescription::class,'prescription_id');
    }

    public function medicine()
    {
        return $this->belongsTo(Medicine::class,'medicine_id');
    }

}
