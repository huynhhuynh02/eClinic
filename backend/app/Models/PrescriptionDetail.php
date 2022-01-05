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
        return $this->hasOne(Prescription::class,'prescription_id');
    }

}
