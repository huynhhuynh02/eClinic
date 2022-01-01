<?php

namespace App\Models;

<<<<<<< HEAD
=======
use App\Models\Schedule;
>>>>>>> develop
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;
<<<<<<< HEAD
    protected $table = "tbl_patients";
=======

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
>>>>>>> develop
}
