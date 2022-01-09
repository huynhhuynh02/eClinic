<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Medicine extends Model
{
    use HasFactory;
    protected $table = 'tbl_medicines';

    public function category() 
    {
        return $this->belongsTo(Category::class,'cate_id');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }
}
