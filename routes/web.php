<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\BugController;
use App\Http\Controllers\NotificationController;
use App\Http\Middleware\UpdateUserLastActive;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\InvitationController;



Route::middleware(['web', UpdateUserLastActive::class])->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        // dashboard 
        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->middleware(['auth', 'verified'])->name('dashboard');
    
        // render the bug form
        Route::get('/bugs', function () {
            return Inertia::render('BugReport');
        })->name('bugs.index');
    
        // Bug Reporting
        Route::post('bugs', [BugController::class, 'store']);
    
        // Notifications 
        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
        Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
        Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
    });
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Impersonate
Route::get('/impersonate/{user}', function (User $user) {
    Session::put('impersonating', Auth::id());
    Auth::login($user);

    return redirect()->route('dashboard');
})->name('impersonate')->middleware('auth');

// Stop Impersonating
Route::get('/stop-impersonating', function () {
    $superadminId = Session::pull('impersonating');
    $superadmin = User::findOrFail($superadminId);
    Auth::login($superadmin);

    return redirect('/admin/users');
})->name('stop-impersonating');

// Google Autehntication
Route::controller(GoogleController::class)->group(function(){
    Route::get('auth/google', 'redirectToGoogle')->name('auth.google');
    Route::get('auth/google/callback', 'handleGoogleCallback');
});

// Invitaion controller 
// Route::get('/invite/{token}', [InvitationController::class, 'accept'])
//     ->name('invitation.accept');
Route::get('/invitation/{token}', [InvitationController::class, 'accept'])->name('invitation.accept');
Route::post('/register-invited', [InvitationController::class, 'register'])->name('register.invited');

require __DIR__.'/auth.php';
