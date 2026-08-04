<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    protected $fillable = [
        'name',
        'gender',
        'pob',
        'dob',
        'religion',
        'education',
        'address',
        'phone_number',
        'marital_status',
        'position',
        'pay_date',
        'salary',
        'is_active',
        'days_off'
    ];

    protected $appends = [
        'salary_formatted',
    ];

    protected function salaryFormatted(): Attribute
    {
        return Attribute::make(
            get: fn() => 'Rp ' . number_format($this->salary, 0, ',', '.')
        );
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    public function payrolls(): HasMany
    {
        return $this->hasMany(Payroll::class);
    }
}
