<?php

namespace App\Filament\Resources\NotificationResource\Pages;

use App\Filament\Resources\NotificationResource;
use App\Models\User;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;
use Filament\Notifications\Notification as FilamentNotification;
use Illuminate\Database\Eloquent\Model;

class CreateNotification extends CreateRecord
{
    protected static string $resource = NotificationResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        // Check if the data is empty before proceeding
        if (empty($data['data']) || $data['data'] == '[]' || $data['data'] == '{}') {
            FilamentNotification::make()
                ->warning()
                ->title('Empty Notification')
                ->body('Cannot create a notification with empty data.')
                ->send();

            $this->halt();
        }

        $recipient = $data['recipient'] ?? 'all';
        unset($data['recipient']);

        $currentUserId = Auth::id();
        $users = $this->getUsersToNotify($recipient, $currentUserId);

        $createdNotifications = [];

        foreach ($users as $user) {
            $dataObject = $this->createDataObject($data, $user);

            $notificationData = array_merge($data, [
                'notifiable_id' => $user->id,
                'notifiable_type' => get_class($user),
                'data' => $dataObject
            ]);

            $createdNotifications[] = $this->getModel()::create($notificationData);
        }

        if (empty($createdNotifications)) {
            FilamentNotification::make()
                ->warning()
                ->title('No notifications created')
                ->body('No users were eligible to receive this notification.')
                ->send();

            $this->halt();
        }

        return $createdNotifications[0];
    }

    protected function getUsersToNotify($recipient, $currentUserId): \Illuminate\Database\Eloquent\Collection
    {
        switch ($recipient) {
            case 'all':
                return User::all();
            case 'users':
                return User::where('is_admin', false)->get();
            case 'admins':
                return User::where('is_admin', true)->get();
            case 'individual':
                return User::where('id', $this->data['notifiable_id'] ?? $currentUserId)->get();
            default:
                return User::all();
        }
    }

    protected function createDataObject(array $data, User $user): array
    {
        return [
            "message" => $data['data'],
            "type" => $data['type'] ?? "Notification",
            "notifiable_role" => $user->is_admin ? "admin" : "user"
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}