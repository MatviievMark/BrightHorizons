<?php

namespace App\Listeners;

use App\Events\BugReported;
use App\Models\User;
use App\Notifications\NewBugReportNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Cache;

class NotifyAdminsOfNewBugReport
{
    public function handle(BugReported $event)
    {
        $bugId = $event->bug->id;
        $cacheKey = "bug_reported_{$bugId}";

        if (Cache::has($cacheKey)) {
            return;
        }

        Cache::put($cacheKey, true, now()->addMinutes(5));

        $notification = new NewBugReportNotification($event->bug);
        
        $adminUsers = User::where('is_admin', true)->get();

        Notification::send($adminUsers, $notification);
    }
}