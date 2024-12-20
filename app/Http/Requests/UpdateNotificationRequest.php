<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateNotificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check() && $this->notification->notifiable_id === Auth::id();
    }

    public function rules(): array
    {
        return [
            'read' => ['required', 'boolean'],
        ];
    }
}