<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function markAsRead(Request $request, $id)
    {
        ray("mark as read");
        
        $notification = Notification::where('id', $id)
            ->where('notifiable_id', Auth::id())
            ->firstOrFail();

        $notification->update(['read_at' => now()]);

        return response()->json($notification);
    }

    public function destroy($id)
    {
        $notification = Notification::where('id', $id)
            ->where('notifiable_id', Auth::id())
            ->firstOrFail();

        $notification->delete();

        return response()->json(['message' => 'Notification deleted']);
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $notifications = Notification::where('notifiable_id', $user->id)
            ->latest()
            ->get();

        return response()->json($notifications);
    }
}