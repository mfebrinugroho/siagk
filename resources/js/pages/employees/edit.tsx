import EditEmployeeForm from '@/components/form/employee/edit-employee-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Employee } from '@/types/employee';
import { Head } from '@inertiajs/react';

interface Props {
    employee: Employee;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Karyawan',
        href: '/employees',
    },
    {
        title: 'Ubah Data Karyawan',
        href: '/employees/edit',
    },
];

const Edit = ({ employee }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Karyawan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="border-sidebar-border/90 dark:border-sidebar-border mb-3 border-b">
                        <CardTitle>Tambah Data Karyawan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <EditEmployeeForm employee={employee} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Edit;
