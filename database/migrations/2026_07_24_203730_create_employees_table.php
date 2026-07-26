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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('gender', 1)->nullable();
            $table->string('pob', 255)->nullable();
            $table->date('dob')->nullable();
            $table->string('religion', 20)->nullable();
            $table->string('education', 125)->nullable();
            $table->string('address', 255)->nullable();
            $table->string('phone_number', 30);
            $table->string('marital_status', 50)->nullable();
            $table->string('position', 100);
            $table->integer('pay_date');
            $table->decimal('salary', 15, 2);
            $table->boolean('is_active')->default(true);
            $table->integer('days_off')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
