<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class DailyTask extends Model
{
    use HasFactory;

    protected $table = 'daily_tasks';

    protected $dates = [
        'deadline'
    ];
    protected $fillable = [
        'title',
        'description',
        'deadline',
        'status'
    ];


    public function taskList()
    {
        return $this->belongsTo(DailyList::class, 'daily_list_id', 'id');
    }

    

    public function scopeFinished(Builder $query)
    {
        $query->where("status", 1);
    }
}
