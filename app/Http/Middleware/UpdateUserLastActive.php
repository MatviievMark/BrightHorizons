<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UpdateUserLastActive
{
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $user->last_active_at = Carbon::now();
            $user->is_online = true;
            if ($user instanceof \Illuminate\Database\Eloquent\Model) {
                $user->save();
            } else {
                // Handle the case where the user is not an Eloquent model
            }
        }
        return $next($request);
    }
}