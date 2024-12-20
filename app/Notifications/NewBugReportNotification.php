<?php

namespace App\Notifications;

use App\Models\Bug;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewBugReportNotification extends Notification
{
    use Queueable;

    public $bug;

    public function __construct(Bug $bug)
    {
        $this->bug = $bug;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => "New bug report: {$this->bug->subject}",
            'bug_report_id' => $this->bug->id,
            'notifiable_role' => 'admin',
            'type' => 'Bug Report',
        ];
    }

    // Add this method to ensure uniqueness
    public function uniqueId()
    {
        return $this->bug->id;
    }
}