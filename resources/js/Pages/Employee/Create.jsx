import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import { useForm, Head } from '@inertiajs/react';

export default function Create({ departments }) {
    const { data, setData, post, errors } = useForm({
        first_name: '',
        last_name: '',
        gender: '',
        birth_date: '',
        hire_date: '',
        dept_no: '',
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employees.store')).then(response => {
            console.log(response); // ตรวจสอบการตอบกลับ
            // ตรวจสอบว่า response.redirected หรือไม่
            if (response.redirected) {
                window.location.href = response.url; // เปลี่ยนเส้นทางไปยังหน้า Employees
            }
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Employee</h2>}>
            <Head title="Create Employee" />
            <div className="max-w-lg mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Add Employee</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name:</label>
                        <input
                            type="text"
                            value={data.first_name}
                            required
                            onChange={(e) => setData('first_name', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                        />
                        {errors.first_name && <InputError message={errors.first_name} />}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            value={data.last_name}
                            required
                            onChange={(e) => setData('last_name', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                        />
                        {errors.last_name && <InputError message={errors.last_name} />}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Birth Date:</label>
                        <input
                            type="date"
                            value={data.birth_date}
                            required
                            onChange={(e) => setData('birth_date', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                        />
                        {errors.birth_date && <InputError message={errors.birth_date} />}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender:</label>
                        <select
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <InputError message={errors.gender} />}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hire Date:</label>
                        <input
                            type="date"
                            value={data.hire_date}
                            required
                            onChange={(e) => setData('hire_date', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                        />
                        {errors.hire_date && <InputError message={errors.hire_date} />}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department:</label>
                        <select
                            value={data.dept_no}
                            onChange={(e) => setData('dept_no', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.dept_no} value={dept.dept_no}>
                                    {dept.dept_name}
                                </option>
                            ))}
                        </select>
                        {errors.dept_no && <InputError message={errors.dept_no} />}
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                        Add Employee
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
