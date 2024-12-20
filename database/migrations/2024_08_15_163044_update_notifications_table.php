<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Add any missing columns
            if (!Schema::hasColumn('notifications', 'id')) {
                $table->uuid('id')->primary();
            }
            if (!Schema::hasColumn('notifications', 'type')) {
                $table->string('type');
            }
            if (!Schema::hasColumn('notifications', 'notifiable_type')) {
                $table->string('notifiable_type');
            }
            if (!Schema::hasColumn('notifications', 'notifiable_id')) {
                $table->unsignedBigInteger('notifiable_id');
            }
            if (!Schema::hasColumn('notifications', 'data')) {
                $table->text('data');
            }
            if (!Schema::hasColumn('notifications', 'read_at')) {
                $table->timestamp('read_at')->nullable();
            }
            
            // Modify any existing columns if necessary
            $table->uuid('id')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
