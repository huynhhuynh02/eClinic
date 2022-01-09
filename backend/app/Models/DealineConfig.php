<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DealineConfig extends Model
{
    use HasFactory;

    protected $table = 'tbl_dealine_configs';

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
