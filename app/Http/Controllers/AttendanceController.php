<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    private function payrollPeriod(int $payday): array
    {
        $today = now();

        if ($today->day > $payday) {
            $start = $today->copy()->day($payday + 1)->startOfDay();
            $end = $today->copy()->addMonth()->day($payday)->endOfDay();
        } else {
            $start = $today->copy()->subMonth()->day($payday + 1)->startOfDay();
            $end = $today->copy()->day($payday)->endOfDay();
        }

        return [$start, $end];
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->string('search');
        $perPage = $request->integer('per_page', 10);
        $start = null;
        $end = null;

        $employees = Employee::select('id', 'name', 'position', 'pay_date', 'salary')
            ->where('is_active', 1)
            ->orderBy('name')
            ->get();

        $employee = Employee::find($request->integer('employee_id'));

        $query = Attendance::query();

        $totalSurplus = 0;
        $totalMinus = 0;

        if ($employee) {
            [$start, $end] = $this->payrollPeriod($employee->pay_date);

            $query->where('employee_id', $employee->id)
                ->whereBetween('date', [$start, $end]);

            // Hitung summary dari SELURUH data
            $summaryQuery = clone $query;

            $totalSurplus = (clone $summaryQuery)
                ->where('type', 'surplus')
                ->sum('amount');

            $totalMinus = (clone $summaryQuery)
                ->where('type', 'minus')
                ->sum('amount');
        }

        $query->when($search, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('description', 'like', "%{$search}%")
                    ->orWhere('amount', 'like', "%{$search}%")
                    ->orWhere('date', 'like', "%{$search}%");
            });
        });

        $attendances = $query
            ->latest('date')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('attendances/index', [
            'attendances' => $attendances,
            'employees' => $employees,
            'start_date' => $start,
            'end_date' => $end,
            'summary' => [
                'total_surplus' => $totalSurplus,
                'total_minus' => $totalMinus,
                'pay_total' => $employee
                    ? $employee->salary + $totalSurplus - $totalMinus
                    : 0,
            ],
            'filters' => [
                'employee_id' => $request->integer('employee_id'),
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $employee = null;

        if ($request->filled('employee_id')) {
            $employee = Employee::find($request->integer('employee_id'));
        }

        return Inertia::render('attendances/create', [
            'employee' => $employee,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => "required",
            'date' => "required",
            'description' => "required",
            'type' => "required",
            'amount' => "required|numeric",
        ]);

        Attendance::create($validated);

        return redirect()
            ->route('attendances.index', [
                'employee_id' => $request->employee_id,
            ])
            ->with('success', 'Data absensi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        $attendance->load('employee');

        return Inertia::render('attendances/edit', [
            'attendance' => $attendance,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        $validated = $request->validate([
            'employee_id' => "required",
            'date' => "required",
            'description' => "required",
            'type' => "required",
            'amount' => "required|numeric",
        ]);

        $attendance->update($validated);

        return redirect()
            ->route('attendances.index', [
                'employee_id' => $request->employee_id,
            ])
            ->with('success', 'Data absensi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Attendance $attendance)
    {
        $attendance->delete();

        return redirect()
            ->route('attendances.index', [
                'employee_id' => $request->employee_id,
            ])
            ->with('success', 'Data absensi berhasil dihapus.');
    }
}
