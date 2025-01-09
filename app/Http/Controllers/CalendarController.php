<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        // Get all events from the database
        $events = Calendar::orderBy('date')->orderBy('time_slot')->get()
            ->map(function($event) {
                return [
                    'id' => $event->id,
                    'date' => $event->date->format('Y-m-d'),
                    'time_slot' => $event->time_slot,
                    'client_name' => $event->client_name,
                    'lesson_type' => $event->lesson_type,
                    'blocked_day' => $event->blocked_day,
                ];
            });

        // Get all blocked days from the database
        $blockedDays = Calendar::where('blocked_day', true)
            ->select('date')
            ->get()
            ->map(function($day) {
                return [
                    'date' => $day->date->format('Y-m-d'),
                    'blocked' => true
                ];
            });

        return Inertia::render('Calendar', [
            'events' => $events,
            'blockedDays' => $blockedDays
        ]);
    }

    public function getEvents()
    {
        return Calendar::orderBy('date')
            ->orderBy('time_slot')
            ->get();
    }

    public function getBlockedDays()
    {
        return Calendar::where('blocked_day', true)
            ->select('date')
            ->get()
            ->map(function($day) {
                return [
                    'date' => $day->date->format('Y-m-d'),
                    'blocked' => true
                ];
            });
    }

    public function getBookedSlots(Request $request)
    {
        $date = $request->query('date');
        
        $bookedSlots = Calendar::where('date', $date)
            ->whereNotNull('time_slot')
            ->get()
            ->map(function($slot) {
                return [
                    'time_slot' => $slot->time_slot,
                    'lesson_type' => $slot->lesson_type
                ];
            });

        return response()->json($bookedSlots);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'time_slot' => 'nullable|string',
            'client_name' => 'nullable|string',
            'lesson_type' => 'nullable|string',
            'blocked_day' => 'boolean'
        ]);

        return Calendar::create($validated);
    }

    public function update(Request $request, Calendar $calendar)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'time_slot' => 'nullable|string',
            'client_name' => 'nullable|string',
            'lesson_type' => 'nullable|string',
            'blocked_day' => 'boolean'
        ]);

        $calendar->update($validated);
        return $calendar;
    }

    public function destroy(Calendar $calendar)
    {
        $calendar->delete();
        return response()->json(['message' => 'Event deleted successfully']);
    }

    public function bookSession(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'time_slot' => 'required|string',
            'client_name' => 'required|string',
            'lesson_type' => 'required|string|in:online,in-person,custom',
            'custom_hours' => 'required_if:lesson_type,custom|integer|min:1'
        ]);

        // Format time slot to include end time
        $startHour = (int)substr($validated['time_slot'], 0, 2);
        $endHour = $startHour + 1;
        $validated['time_slot'] = sprintf('%02d:00-%02d:00', $startHour, $endHour);

        // For custom lessons, check if all required slots are available
        if ($validated['lesson_type'] === 'custom') {
            $customHours = $validated['custom_hours'];
            $requiredHours = range($startHour, $startHour + $customHours - 1);

            // Validate business hours
            if ($requiredHours[0] < 8 || end($requiredHours) >= 20) {
                return response()->json([
                    'message' => 'Custom lessons must be booked within business hours (8:00-20:00)'
                ], 422);
            }

            // Check if all slots are available
            foreach ($requiredHours as $hour) {
                $checkTimeSlot = sprintf('%02d:00-%02d:00', $hour, $hour + 1);
                
                $existingBooking = Calendar::where('date', $validated['date'])
                    ->where('time_slot', $checkTimeSlot)
                    ->first();
                
                if ($existingBooking) {
                    return response()->json([
                        'message' => "The time slot {$checkTimeSlot} is already booked"
                    ], 422);
                }
            }

            // Create bookings for all required hours
            $bookings = [];
            foreach ($requiredHours as $hour) {
                $bookings[] = Calendar::create([
                    'date' => $validated['date'],
                    'time_slot' => sprintf('%02d:00-%02d:00', $hour, $hour + 1),
                    'client_name' => $validated['client_name'],
                    'lesson_type' => 'custom',
                    'blocked_day' => false
                ]);
            }

            // Return all created events formatted
            return array_map(function($booking) {
                return [
                    'id' => $booking->id,
                    'date' => $booking->date->format('Y-m-d'),
                    'time_slot' => $booking->time_slot,
                    'client_name' => $booking->client_name,
                    'lesson_type' => $booking->lesson_type,
                    'blocked_day' => $booking->blocked_day,
                ];
            }, $bookings);
        }

        // Check if the time slot is already booked
        $existingBooking = Calendar::where('date', $validated['date'])
            ->where('time_slot', $validated['time_slot'])
            ->first();

        if ($existingBooking) {
            return response()->json([
                'message' => 'This time slot is already booked'
            ], 422);
        }

        // For in-person lessons, we need to block 4 time slots
        if ($validated['lesson_type'] === 'in-person') {
            // Get the hour from time_slot (format: "HH:00-HH:00")
            $hour = (int)substr($validated['time_slot'], 0, 2);
            
            // Check if we have the slot above and three slots below
            $requiredHours = [$hour - 1, $hour, $hour + 1, $hour + 2];

            // Validate all required hours are within business hours (8:00-20:00)
            if ($requiredHours[0] < 8 || $requiredHours[3] >= 20) {
                return response()->json([
                    'message' => 'In-person lessons must be booked within business hours (8:00-20:00) and need one slot above for travel'
                ], 422);
            }

            // Check if all required slots are available
            foreach ($requiredHours as $checkHour) {
                $checkTimeSlot = sprintf('%02d:00-%02d:00', $checkHour, $checkHour + 1);
                
                $existingBooking = Calendar::where('date', $validated['date'])
                    ->where('time_slot', $checkTimeSlot)
                    ->first();
                
                if ($existingBooking) {
                    return response()->json([
                        'message' => 'You need to have 4 consecutive slots available to book an in-person session (1 above for travel, 2 for lesson, 1 below for travel)'
                    ], 422);
                }
            }

            // Create the bookings in the correct order with proper types
            $bookings = [];
            
            // First slot (travel)
            $bookings[] = Calendar::create([
                'date' => $validated['date'],
                'time_slot' => sprintf('%02d:00-%02d:00', $requiredHours[0], $requiredHours[0] + 1),
                'client_name' => $validated['client_name'],
                'lesson_type' => 'travel',
                'blocked_day' => false
            ]);

            // Second and third slots (actual lesson)
            for ($i = 1; $i <= 2; $i++) {
                $bookings[] = Calendar::create([
                    'date' => $validated['date'],
                    'time_slot' => sprintf('%02d:00-%02d:00', $requiredHours[$i], $requiredHours[$i] + 1),
                    'client_name' => $validated['client_name'],
                    'lesson_type' => 'in-person',
                    'blocked_day' => false
                ]);
            }

            // Fourth slot (travel)
            $bookings[] = Calendar::create([
                'date' => $validated['date'],
                'time_slot' => sprintf('%02d:00-%02d:00', $requiredHours[3], $requiredHours[3] + 1),
                'client_name' => $validated['client_name'],
                'lesson_type' => 'travel',
                'blocked_day' => false
            ]);

            // Return all bookings formatted
            return array_map(function($booking) {
                return [
                    'id' => $booking->id,
                    'date' => $booking->date->format('Y-m-d'),
                    'time_slot' => $booking->time_slot,
                    'client_name' => $booking->client_name,
                    'lesson_type' => $booking->lesson_type,
                    'blocked_day' => $booking->blocked_day,
                ];
            }, $bookings);
        }

        // For online lessons, just create a single booking
        $booking = Calendar::create([
            'date' => $validated['date'],
            'time_slot' => $validated['time_slot'],
            'client_name' => $validated['client_name'],
            'lesson_type' => $validated['lesson_type'],
            'blocked_day' => false
        ]);

        return [
            'id' => $booking->id,
            'date' => $booking->date->format('Y-m-d'),
            'time_slot' => $booking->time_slot,
            'client_name' => $booking->client_name,
            'lesson_type' => $booking->lesson_type,
            'blocked_day' => $booking->blocked_day,
        ];
    }
}
