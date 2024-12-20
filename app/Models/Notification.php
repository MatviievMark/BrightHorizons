<?php

namespace App\Models;

use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Str;

class Notification extends DatabaseNotification
{
    protected $table = 'notifications';

    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['type', 'notifiable_type', 'notifiable_id', 'data'];

    protected $casts = [
        'data' => 'array',
    ];

    protected static function booted()
    {
        static::creating(function ($notification) {
            $notification->id = $notification->id ?? Str::uuid()->toString();
            $notification->notifiable_type = $notification->notifiable_type ?? User::class;
            $notification->notifiable_id = $notification->notifiable_id ?? 1; // Default to user ID 1 if not set
            
            $data = $notification->data;
            
            if (is_string($data)) {
                $data = json_decode($data, true);
            }

            $notification->data = $data ?? [];

            if (isset($data['notifiable_role']) && $data['notifiable_role'] === 'admin') {
                $notification->notifiable_type = 'admin';
            }

            if (isset($data['type'])) {
                $notification->type = $data['type'];
            }
        });
    }
}