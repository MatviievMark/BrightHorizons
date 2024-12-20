<?php

namespace App\Filament\Widgets;

use App\Models\Notification;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;

class RecentNotificationsWidget extends BaseWidget
{
    protected function getTableQuery(): Builder
    {
        return Notification::query()->latest()->limit(5);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('type'),
            Tables\Columns\TextColumn::make('data')
                ->limit(50),
            Tables\Columns\BooleanColumn::make('read_at')
                ->trueIcon('heroicon-o-check-circle')
                ->falseIcon('heroicon-o-x-circle')
                ->label('Read'),
            Tables\Columns\TextColumn::make('created_at')
                ->dateTime(),
        ];
    }
}