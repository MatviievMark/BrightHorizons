<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;
use App\Mail\UserInvitationMail;
use Illuminate\Support\Facades\Mail;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;

    protected function afterCreate(): void
    {
        $user = $this->record;

        $invitationToken = Str::random(32);
        $user->update(['invitation_token' => $invitationToken]);
        
        $invitationUrl = route('invitation.accept', ['token' => $invitationToken]);
        Mail::to($user->email)->send(new UserInvitationMail($invitationUrl, $user->name));
    }
}
