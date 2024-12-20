<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;  


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_admin',
        'google_id',    
        'last_active_at',
        'is_online',
        'invitation_token',
        'invite_accepted',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function boot() 
    {
        parent::boot(); 

        static::creating(function($user) {
            $user->password = Hash::make('password');   
        });
    }
    public function getIsClientAdminAttribute()
    {
        return in_array($this->id, $this->client->adminUsers()->pluck('users.id')->toArray()) ? 'Yes' : 'Nogit add';
    }

    public function isAdmin() 
    {
        return $this->is_admin === 1;   
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable')->orderBy('created_at', 'desc');
    }

    public function isOnline()
    {
        return $this->is_online && $this->last_active_at > Carbon::now()->subMinutes(5);
    }
}
