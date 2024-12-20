<?php

namespace App\Filament\Widgets;

use App\Models\Bug;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;

class RecentBugReports extends BaseWidget
{
    protected function getTableQuery(): Builder
    {
        return Bug::query()->latest()->limit(5);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('subject'),
            Tables\Columns\TextColumn::make('feedback_type'),
            Tables\Columns\TextColumn::make('created_at')
                ->dateTime(),
        ];
    }
}