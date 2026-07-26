<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search');
        $perPage = $request->integer('per_page', 5);

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

    public function create()
    {
        return Inertia::render('employees/create');
    }

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

    public function show(Employee $employee)
    {
        return Inertia::render('employees/show', [
            'employee' => $employee,
        ]);
    }

    public function edit(Employee $employee)
    {
        return Inertia::render('employees/edit', [
            'employee' => $employee,
        ]);
    }

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

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()
            ->route('employees.index')
            ->with('success', 'Data karyawan berhasil dihapus.');
    }
}
