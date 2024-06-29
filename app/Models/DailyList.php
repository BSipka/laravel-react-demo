<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyList extends Model
{
    use HasFactory;

    protected $table = 'daily_lists';
    protected $fillable = [
        'user_id',
        'title',
        'description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function tasks()
    {
        return $this->hasMany(DailyTask::class, 'id', 'daily_list_id');
    }
}
