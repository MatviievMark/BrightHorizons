<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class OnlineUsersWidget extends BaseWidget
{
    protected function getTableQuery(): Builder
    {
        return User::query()
            ->where('is_online', true)
            ->where('last_active_at', '>', Carbon::now()->subMinutes(5))
            ->latest('last_active_at')
            ->limit(10); // Adjust the limit as needed
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('name')
                ->label('User'),
            Tables\Columns\TextColumn::make('email'),
            Tables\Columns\IconColumn::make('is_online')
                ->boolean()
                ->trueIcon('heroicon-o-check-circle')
                ->falseIcon('heroicon-o-x-circle')
                ->label('Online'),
            Tables\Columns\TextColumn::make('last_active_at')
                ->dateTime()
                ->label('Last Active'),
        ];
    }
}