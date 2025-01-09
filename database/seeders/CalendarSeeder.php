<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // January 7th - Online lessons
        DB::table('calendar')->insert([
            'date' => '2024-01-07',
            'time_slot' => '08:00-09:00',
            'client_name' => 'Online Student 1',
            'lesson_type' => 'online',
            'blocked_day' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('calendar')->insert([
            'date' => '2024-01-07',
            'time_slot' => '13:00-14:00',
            'client_name' => 'Online Student 2',
            'lesson_type' => 'online',
            'blocked_day' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // January 7th - In-person lesson sequence
        DB::table('calendar')->insert([
            'date' => '2024-01-07',
            'time_slot' => '14:00-15:00',
            'client_name' => 'In-person Student',
            'lesson_type' => 'travel',
            'blocked_day' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('calendar')->insert([
            'date' => '2024-01-07',
            'time_slot' => '15:00-16:00',
            'client_name' => 'In-person Student',
            'lesson_type' => 'in-person',
            'blocked_day' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('calendar')->insert([
            'date' => '2024-01-07',
            'time_slot' => '16:00-17:00',
            'client_name' => 'In-person Student',
            'lesson_type' => 'in-person',
            'blocked_day' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('calendar')->insert([
            'date' => '2024-01-07',
            'time_slot' => '17:00-18:00',
            'client_name' => 'In-person Student',
            'lesson_type' => 'travel',
            'blocked_day' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // January 8th - Blocked day
        DB::table('calendar')->insert([
            'date' => '2024-01-08',
            'time_slot' => null,
            'client_name' => null,
            'lesson_type' => null,
            'blocked_day' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
