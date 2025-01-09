<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user directly without factory
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'is_admin' => true,
            'invite_accepted' => true
        ]);

        // Set password after creation to avoid boot method override
        $admin->password = Hash::make('test1234');
        $admin->save();

        // Run the calendar seeder
        $this->call(CalendarSeeder::class);
    }
}
