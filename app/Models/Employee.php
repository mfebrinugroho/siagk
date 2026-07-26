<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

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
}
