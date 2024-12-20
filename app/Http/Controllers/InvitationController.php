<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function accept($token)
    {
        $user = User::where('invitation_token', $token)->first();

        if (!$user) {
            return redirect()->route('login')
                ->with('error', 'Invalid invitation token.');
        }

        // Render the register page with the user's email
        return Inertia::render('Auth/Register', [
            'email' => $user->email,
            'token' => $token,
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8|confirmed',
            'token' => 'required|string',
        ]);

        $user = User::where('email', $request->email)
                    ->where('invitation_token', $request->token)
                    ->first();

        if (!$user) {
            return back()->with('error', 'Invalid invitation.');
        }

        $user->update([
            'name' => $request->name,
            'password' => bcrypt($request->password),
            'invitation_token' => null,
            'invite_accepted' => true,
        ]);

        Auth::login($user);

        return redirect()->route('dashboard')
            ->with('success', 'Registration completed successfully.');
    }
}