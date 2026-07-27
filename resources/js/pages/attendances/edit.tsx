import EditAttendanceForm from '@/components/form/attendance/edit-attendance-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Attendance } from '@/types/attendance';
import { Head } from '@inertiajs/react';

interface Props {
    attendance: Attendance;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Absensi',
        href: '/attendances',
    },
    {
        title: 'Ubah Data Absensi',
        href: '/attendances/edit',
    },
];

const Edit = ({ attendance }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Data Absensi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="border-sidebar-border/90 dark:border-sidebar-border mb-3 border-b">
                        <CardTitle>Ubah Data Absensi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <EditAttendanceForm attendance={attendance} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Edit;
