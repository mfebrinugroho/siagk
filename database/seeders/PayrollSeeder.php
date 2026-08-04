<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Payroll;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PayrollSeeder extends Seeder
{
  public function run(): void
  {
    $employees = Employee::whereBetween('id', [1, 10])->get();

    foreach ($employees as $employee) {

      $periods = [
        ['2024-01-01', '2024-12-31'],
        ['2025-01-01', '2025-12-31'],
        ['2026-01-01', '2026-06-31'],
      ];

      foreach ($periods as $period) {

        $bonus = rand(100000, 1000000);
        $deduction = rand(50000, 300000);

        Payroll::create([
          'employee_id'      => $employee->id,
          'period_start'     => $period[0],
          'period_end'       => $period[1],
          'description'      => 'Payroll bulan Januari',
          'basic_salary'     => $employee->salary,
          'total_bonus'      => $bonus,
          'total_deduction'  => $deduction,
          'net_salary'       => $employee->salary + $bonus - $deduction,
          'status'           => 'paid',
          'paid_at'          => Carbon::parse($period[1])->addDays(1),
        ]);
      }
    }
  }
}
