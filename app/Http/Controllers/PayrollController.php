<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employee;
use App\Models\Payroll;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PayrollController extends Controller
{
    private function payrollPeriod(int $payday): array
    {
        $today = now();

        if ($today->day >= $payday) {
            $start = $today->copy()->subMonth()->day($payday)->startOfDay();
            $end = $today->copy()->day($payday)->subDay()->endOfDay();
        } else {
            $start = $today->copy()->subMonths(2)->day($payday)->startOfDay();
            $end = $today->copy()->subMonth()->day($payday)->subDay()->endOfDay();
        }

        return [$start, $end];
    }

    private function payrollDueDate(int $payDate): Carbon
    {
        $today = now();

        if ($today->day > $payDate) {
            return $today->copy()->addMonth()->day($payDate);
        }

        return $today->copy()->day($payDate);
    }

    private function Unprocesseds(int $perPage = 10, string $search = null)
    {
        $employees = Employee::with([
            'attendances' => function ($query) {
                $query->whereNull('payroll_id');
            }
        ])
            ->where('is_active', true)
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->paginate($perPage)->withQueryString();

        $employees->getCollection()->transform(function ($employee) {

            [$start, $end] = $this->payrollPeriod($employee->pay_date);

            $dueDate = $this->payrollDueDate($employee->pay_date);

            $payrollExists = Payroll::where('employee_id', $employee->id)
                ->whereDate('period_start', $start)
                ->whereDate('period_end', $end)
                ->exists();

            $employee->can_generate = now()->greaterThanOrEqualTo($dueDate) && !$payrollExists;

            $attendances = $employee->attendances
                ->whereBetween('date', [$start, $end]);

            $employee->period_start = $start->toDateString();
            $employee->period_end = $end->toDateString();
            $employee->basic_salary = $employee->salary;

            $employee->total_bonus = $attendances
                ->where('type', 'surplus')
                ->sum('amount');

            $employee->total_deduction = $attendances
                ->where('type', 'minus')
                ->sum('amount');

            $employee->net_salary =
                $employee->salary +
                $employee->total_bonus -
                $employee->total_deduction;

            return $employee;
        });

        return $employees;
    }

    public function Onprocesseds(int $perPage = 10, string $search = null)
    {
        $onprocesseds = Payroll::with('employee')
            ->where('status', 'pending')
            ->when($search, function ($query) use ($search) {
                $query->whereHas('employee', function ($employee) use ($search) {
                    $employee->where('name', 'like', "%{$search}%");
                });
            })
            ->paginate($perPage)
            ->withQueryString();

        return $onprocesseds;
    }

    public function Processeds(int $perPage = 10, string $search = null)
    {
        $processeds = Payroll::with('employee')
            ->where('status', 'paid')
            ->when($search, function ($query) use ($search) {
                $query->whereHas('employee', function ($employee) use ($search) {
                    $employee->where('name', 'like', "%{$search}%");
                });
            })
            ->orderBy('paid_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return $processeds;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tab = $request->input('tab', 'unprocesseds');
        $search = $request->input('search', '');
        $perPage = $request->integer('per_page', 10);

        $payrolls = match ($tab) {
            'processeds' => $this->Processeds($perPage, $search),
            'onprocesseds' => $this->Onprocesseds($perPage, $search),
            default => $this->Unprocesseds($perPage, $search),
        };

        return Inertia::render('payrolls/index', [
            'tab' => $tab,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
            'payrolls' => $payrolls,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => "required",
            'period_start' => "required",
            'period_end' => "required",
            'basic_salary' => "required",
            'total_bonus' => "required",
            'total_deduction' => "required",
            'net_salary' => "required",
            'status' => "nullable",
        ]);

        DB::transaction(function () use ($validated) {

            $payroll = Payroll::create([
                ...$validated,
                'period_start' => Carbon::parse($validated['period_start'])->toDateString(),
                'period_end' => Carbon::parse($validated['period_end'])->toDateString(),
            ]);

            Attendance::where('employee_id', $validated['employee_id'])
                ->whereNull('payroll_id')
                ->whereBetween('date', [
                    $payroll->period_start,
                    $payroll->period_end,
                ])
                ->update([
                    'payroll_id' => $payroll->id,
                ]);
        });


        return redirect()
            ->route('payrolls.index', [
                'tab' => 'onprocesseds',
            ])
            ->with('success', 'Data penggajian berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payroll $payroll)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payroll $payroll)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payroll $payroll)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payroll $payroll)
    {
        $payroll->attendances()->update([
            'payroll_id' => null,
        ]);

        $payroll->delete();

        return redirect()
            ->route('payrolls.index', [
                'tab' => 'unprocesseds',
            ])
            ->with('success', 'Data penggajian yang sedang diproses berhasil dihapus.');
    }

    public function paid(Request $request, Payroll $payroll)
    {
        $validated = $request->validate([
            'description' => ['required', 'string'],
        ]);

        $payroll->update([
            'description' => $validated['description'],
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        return redirect()
            ->route('payrolls.index', [
                'tab' => 'processeds',
            ])
            ->with('success', 'Penggajian berhasil dibayarkan.');
    }
}
