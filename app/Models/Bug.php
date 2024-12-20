<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\Notification;
use App\Notifications\NewBugReportNotification;
use Spatie\Ray\Ray; 

class Bug extends Model
{
    use HasFactory;

    protected $fillable = ['subject', 'description', 'screenshot', 'feedback_type'];

    protected static function booted()
{

}

    // If you have a relationship with notifications, add it here
    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
