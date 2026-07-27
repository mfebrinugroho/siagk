import EditFilterAttendanceForm from '@/components/form/filter-attendance/edit-filter-attendance-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Attendance } from '@/types/attendance';
import { Head } from '@inertiajs/react';

interface Props {
    attendance: Attendance;
    query: {
        employee_id: number;
        start_date: string;
        end_date: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Absensi',
        href: '/filter-attendances',
    },
    {
        title: 'Ubah Data Absensi',
        href: '/filter-attendances/edit',
    },
];

const Edit = ({ attendance, query }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Data Absensi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="border-sidebar-border/90 dark:border-sidebar-border mb-3 border-b">
                        <CardTitle>Ubah Data Absensi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <EditFilterAttendanceForm attendance={attendance} query={query} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Edit;
