<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function linkAccount()
    {
        if (!Auth::check()) {
            return redirect()->route('login')
                ->with('error', 'You must be logged in to link your Google account.');
        }

        return $this->redirectToGoogle();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = $this->findExistingUser($googleUser);

            if (!$user) {
                return redirect()->route('login')
                    ->with('error', 'No account found with this Google email. Please register first.');
            }

            Auth::login($user);
            return redirect()->intended('/');

        } catch (Exception $e) {
            return redirect()->route('login')
                ->with('error', 'Google login failed: ' . $e->getMessage());
        }
    }

    private function findExistingUser($googleUser)
    {
        $user = User::where('google_id', $googleUser->id)
            ->orWhere('email', $googleUser->email)
            ->first();

        if ($user) {
            // Update the Google ID if it's not set
            if (!$user->google_id) {
                $user->google_id = $googleUser->id;
                $user->save();
            }
        }

        return $user;
    }
}