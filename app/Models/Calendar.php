<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $table = 'calendar';
    
    protected $fillable = [
        'date',
        'time_slot',
        'client_name',
        'lesson_type',
        'blocked_day'
    ];

    protected $casts = [
        'date' => 'date',
        'blocked_day' => 'boolean'
    ];
}