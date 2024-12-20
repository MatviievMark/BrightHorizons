<?php

namespace App\Events;

use App\Models\Bug;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BugReported
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $bug;

    public function __construct(Bug $bug)
    {
        $this->bug = $bug;
    }
}