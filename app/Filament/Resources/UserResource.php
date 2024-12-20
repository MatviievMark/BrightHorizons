<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Livewire\Attributes\Reactive;
use Filament\Forms\Components\Checkbox;
use Illuminate\Support\Facades\Hash;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Mail\UserInvitationMail;
use Illuminate\Support\Facades\Mail;
class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'Users';    

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->email()
                    ->required()
                    ->unique(
                        table: User::class, 
                        column: 'email', 
                        ignorable: fn ($record) => $record
                    )
                    // currently on for testing purposes 
                    // ->autocomplete(false)
                    ->validationMessages([
                        'unique' => 'A user already exists with this email.',
                    ]),
                Select::make('role')
                    ->options([
                        'admin' => 'Admin',
                        'user' => 'User',
                    ])
                    ->required()  
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set) {
                        $set('is_admin', $state === 'admin' ? 1 : 0);
                    }),
                Hidden::make('is_admin')
                    ->default(0),
                
                ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),   
                Tables\Columns\TextColumn::make('email')->searchable()->sortable(),  
                Tables\Columns\TextColumn::make('role')->searchable()->sortable(),
                // Tables\Columns\TextColumn::make('is_client_admin')->label('Is Client Admin')->searchable()->sortable(), 
                IconColumn::make('is_online')
                    ->boolean()
                    ->getStateUsing(fn (User $record) => $record->isOnline())
                    ->label('Online'),
                TextColumn::make('last_active_at')
                    ->formatStateUsing(function ($state) {
                        if (!$state) return '';
                        return Carbon::parse($state)->format('M d, H:i');
                    })
                    ->sortable()
                    ->label('Last Active'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Action::make('loginAs')
                    ->label('Log in')
                    ->url(fn (User $record) => route('impersonate', $record)),
                Tables\Actions\EditAction::make(),
                Action::make('resendInvite')
                    ->label('Resend Invite')
                    ->icon('heroicon-o-envelope')
                    ->action(function (User $user) {
                        $invitationToken = Str::random(32);
                        $user->update(['invitation_token' => $invitationToken]);
                        
                        $invitationUrl = route('invitation.accept', ['token' => $invitationToken]);
                        Mail::to($user->email)->send(new UserInvitationMail($invitationUrl, $user->name));
                    })
                    ->visible(fn (User $record): bool => !$record->invite_accepted)
                    ->requiresConfirmation(),

                ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
