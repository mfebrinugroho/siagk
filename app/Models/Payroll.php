<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Payroll extends Model
{
    protected $fillable = [
        'employee_id',
        'period_start',
        'period_end',
        'description',
        'basic_salary',
        'total_bonus',
        'total_deduction',
        'net_salary',
        'status',
        'paid_at'
    ];

    public function attendance(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }
}
