<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

use Illuminate\Support\Facades\Event;
use App\Events\BugReported;
use App\Listeners\NotifyAdminsOfNewBugReport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Gate::define('viewPulse', function ($user) {
        //     return $user->isAdmin();
        // }); \
        Event::listen(BugReported::class, [NotifyAdminsOfNewBugReport::class, 'handle']);

    }
}
