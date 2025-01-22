<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search');
        $employees = DB::table("employees")
            ->where('first_name', 'like', '%' . $query . '%')
            ->orwhere('emp_no', $query)
            ->orWhere('last_name', 'like', '%' . $query . '%')
            ->paginate(10);
        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'query' => $query,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // ดึงรายชื่อแผนกจากฐานข้อมูล
        $departments = DB::table('departments')->select('dept_no', 'dept_name')->get();
        // ส่งข้อมูลไปยังหน้า Inertia
        return inertia('Employee/Create', ['departments' => $departments]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'hire_date' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'dept_no' => 'required|exists:departments,dept_no',
        ]);

        // สร้างหมายเลขพนักงานใหม่
        $newEmpNo = DB::table('employees')->max('emp_no') + 1;

        // เพิ่มข้อมูลลงในตาราง employees
        DB::table('employees')->insert([
            'emp_no' => $newEmpNo,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'birth_date' => $validated['birth_date'],
            'hire_date' => $validated['hire_date'],
            'gender' => $validated['gender'] === 'male' ? 'M' : ($validated['gender'] === 'female' ? 'F' : 'O'), // แปลงค่าที่ส่งเข้ามา
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // เพิ่มข้อมูลลงในตาราง dept_emp
        DB::table('dept_emp')->insert([
            'emp_no' => $newEmpNo,
            'dept_no' => $validated['dept_no'],
            'from_date' => now(),
            'to_date' => '9999-01-01',
        ]);
        //add and back to employees page
        return redirect()->route('employees.index')->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
