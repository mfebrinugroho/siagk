import PaginationTable from '@/components/table/pagination-table';
import PerPageInput from '@/components/table/per-page-input';
import SearchInput from '@/components/table/search-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { payDate } from '@/lib/date';
import { ResponsePagination, type BreadcrumbItem } from '@/types';
import { Employee } from '@/types/employee';
import { Head, router } from '@inertiajs/react';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    total_employee: number;
    employees: ResponsePagination<Employee>;
    filters: {
        search?: string;
        per_page?: number;
    };
}

export default function Dashboard({ total_employee, employees, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [perPage, setPerPage] = useState(filters.per_page ?? 10);

    const headerColumns = [
        { key: 'number', label: '#' },
        { key: 'name', label: 'Nama' },
        { key: 'position', label: 'Jabatan' },
        { key: 'pay_date', label: 'Tanggal Gajian' },
    ];

    const fetchEmployees = (params: Partial<typeof filters> = {}) => {
        router.get(
            route('dashboard.index'),
            {
                ...(params.search ? { search: params.search } : {}),
                ...(params.per_page && params.per_page !== 10 ? { per_page: params.per_page } : {}),
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchEmployees({
                search,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const handlePerPage = (value: number) => {
        setPerPage(value);

        fetchEmployees({
            per_page: value,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="grid grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Karyawan</CardTitle>

                                <Users className="text-muted-foreground h-5 w-5" />
                            </CardHeader>

                            <CardContent>
                                <div className="text-3xl font-bold">{total_employee}</div>

                                <p className="text-muted-foreground text-sm">Karyawan Aktif</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gajian Hari Ini</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex w-full items-center justify-between">
                                <PerPageInput value={perPage} onChange={handlePerPage} />
                                <SearchInput value={search} onChange={setSearch} />
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {headerColumns.map((column) => (
                                            <TableHead key={column.key}>{column.label}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employees.data.length > 0 ? (
                                        employees.data.map((employee, index) => (
                                            <TableRow key={employee.id}>
                                                <TableCell>{employees.from + index}</TableCell>
                                                <TableCell>{employee.name}</TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{payDate(employee.pay_date)}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={headerColumns.length} className="text-muted-foreground text-center">
                                                Tidak ada karyawan yang gajian pada hari ini.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <PaginationTable links={employees.links} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
