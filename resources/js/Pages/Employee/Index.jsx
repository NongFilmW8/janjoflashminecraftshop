import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
// ป็นการนำเข้า router จาก Inertia.js ใช้สำหรับการนำทางและการจัดการการขอ
// HTTP ใน React ที่ใช้ Inertia.js
export default function Index({ employees, query }) {
    const [search, setSearch] = useState(query || '');

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.get('/employees', { search });
        }
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, { search });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Employee List
                </h2>
            }
        >
            <Head title="Employees" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search employees..."
                                className="w-full px-4 py-2 border-2 border-green-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Search
                            </button>
                        </form>

                        {/* Employee Table */}
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full bg-white rounded-lg shadow-md">
                                <thead className="bg-green-600 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase">ID</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase">First Name</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase">Last Name</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase">Gender</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase">Birth Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-green-200">
                                    {employees.data.map((employee, index) => (
                                        <tr key={index} className="hover:bg-green-100">
                                            <td className="px-6 py-4 text-sm text-gray-700">{employee.emp_no}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{employee.first_name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{employee.last_name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {employee.gender === 'M' ? 'Male' : 'Female'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{employee.birth_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center">
                            {employees.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(link.url)}
                                    disabled={!link.url}
                                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                                        link.active
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    } ${!link.url && 'cursor-not-allowed opacity-50'}`}
                                >
                                    {link.label.replace('&laquo;', 'Previous').replace('&raquo;', 'Next')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
