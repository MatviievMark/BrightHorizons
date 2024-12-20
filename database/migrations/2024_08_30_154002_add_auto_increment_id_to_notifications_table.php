<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddAutoIncrementIdToNotificationsTable extends Migration
{
    public function up()
    {
        // First add the column
        Schema::table('notifications', function (Blueprint $table) {
            $table->unsignedBigInteger('auto_increment_id')->after('id')->nullable();
        });

        // Then modify it to be auto-increment
        DB::statement('ALTER TABLE notifications MODIFY auto_increment_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE');
    }

    public function down()
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropColumn('auto_increment_id');
        });
    }
}