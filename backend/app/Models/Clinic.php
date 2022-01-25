<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    use HasFactory;
	protected $table = "tbl_clinics";
	
    protected $fillable = [
        'name',
        'email',
        'address',
        'logo',

    ];
	public function users()
    {
		return $this->hasMany(User::class, 'clinic_id');
    }

}
