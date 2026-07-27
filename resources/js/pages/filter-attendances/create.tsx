import CreateFilterAttendanceForm from '@/components/form/filter-attendance/create-filter-attendance-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Employee } from '@/types/employee';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Filter Absensi',
        href: '/filter-attendances',
    },
    {
        title: 'Tambah Data Absensi',
        href: '/filter-attendances/create',
    },
];

interface Props {
    employee: Employee;
    start_date: string;
    end_date: string;
}

const Create = ({ employee, start_date, end_date }: Props) => {
    const query = { employee_id: employee?.id, start_date: start_date, end_date: end_date };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Karyawan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="border-sidebar-border/90 dark:border-sidebar-border mb-3 border-b">
                        <CardTitle>Tambah Data Absensi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CreateFilterAttendanceForm employee={employee} query={query} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Create;
