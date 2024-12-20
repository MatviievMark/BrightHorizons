<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NotificationResource\Pages;
use App\Filament\Resources\NotificationResource\RelationManagers;
use App\Models\Notification;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use App\Models\User;    
use Carbon\Carbon;

class NotificationResource extends Resource
{
    protected static ?string $model = Notification::class;

    protected static ?string $navigationIcon = 'heroicon-o-bell';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('type')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('data')
                    ->required()
                    ->label('Message')
                    ->formatStateUsing(function ($state) {
                        if (is_array($state) || is_object($state)) {
                            return json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                        }
                        return $state;
                    })
                    ->autosize(),
                Forms\Components\Select::make('recipient')
                    ->options([
                        'all' => 'Everyone',
                        'users' => 'All Users',
                        'admins' => 'All Admins',
                        'individual' => 'Individual User',
                    ])
                    ->required()
                    ->reactive(),
                Forms\Components\Select::make('notifiable_id')
                    ->label('User')
                    ->options(User::all()->pluck('name', 'id'))
                    ->searchable()
                    ->required()
                    ->visible(fn (callable $get) => $get('recipient') === 'individual'),
                Forms\Components\DateTimePicker::make('created_at')
                    ->default(Carbon::now())
                    ->readonly(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('type'),
                Tables\Columns\TextColumn::make('data')
                    ->limit(50),
                Tables\Columns\BooleanColumn::make('read_at')
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->label('Read'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime(),
            ])
            ->filters([
                Tables\Filters\Filter::make('unread')
                    ->query(fn (Builder $query): Builder => $query->whereNull('read_at')),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\Action::make('mark_as_read')
                    ->action(fn (Notification $record) => $record->update(['read_at' => now()]))
                    ->requiresConfirmation()
                    ->hidden(fn (Notification $record): bool => $record->read_at !== null),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                Tables\Actions\BulkAction::make('mark_as_read')
                    ->action(fn (Collection $records) => $records->each->update(['read_at' => now()]))
                    ->requiresConfirmation()
                    ->deselectRecordsAfterCompletion(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNotifications::route('/'),
            'create' => Pages\CreateNotification::route('/create'),
            'edit' => Pages\EditNotification::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->where('notifiable_id', Auth::id());
    }
}
