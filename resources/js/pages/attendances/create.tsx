import CreateAttendanceForm from '@/components/form/attendance/create-attendance-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Employee } from '@/types/employee';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Absensi',
        href: '/attendances',
    },
    {
        title: 'Tambah Data Absensi',
        href: '/attendances/create',
    },
];

interface Props {
    employee: Employee;
}

const Create = ({ employee }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Karyawan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="border-sidebar-border/90 dark:border-sidebar-border mb-3 border-b">
                        <CardTitle>Tambah Data Absensi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CreateAttendanceForm employee={employee} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Create;
