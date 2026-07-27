<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->string('search');
        $perPage = $request->integer('per_page', 10);

        $employees = Employee::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('position', 'like', "%{$search}%");
            })
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('employees/index', [
            'employees' => $employees,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('employees/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => "required|min:3",
            'gender' => "string|nullable",
            'pob' => "string|nullable",
            'dob' => "string|nullable",
            'religion' => "string|nullable",
            'education' => "string|nullable",
            'address' => "string|nullable",
            'phone_number' => "required|min:11",
            'position' => "required|min:3",
            'marital_status' => "string|nullable",
            'pay_date' => "required|integer|min:1",
            'salary' => "required|numeric|min:1",
            'days_off' => "nullable|integer",
        ]);

        $validated['is_active'] = true;

        Employee::create($validated);

        return redirect()
            ->route('employees.index')
            ->with('success', 'Data karyawan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return Inertia::render('employees/show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('employees/edit', [
            'employee' => $employee,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => "required|min:3",
            'gender' => "string|nullable",
            'pob' => "string|nullable",
            'dob' => "string|nullable",
            'religion' => "string|nullable",
            'education' => "string|nullable",
            'address' => "string|nullable",
            'phone_number' => "required|min:11",
            'position' => "required|min:3",
            'marital_status' => "string|nullable",
            'pay_date' => "required|integer|min:1",
            'salary' => "required|numeric|min:1",
            'days_off' => "nullable|integer",
        ]);

        $validated['is_active'] = true;

        $employee->update($validated);

        return redirect()
            ->route('employees.index')
            ->with('success', 'Data karyawan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()
            ->route('employees.index')
            ->with('success', 'Data karyawan berhasil dihapus.');
    }
}
