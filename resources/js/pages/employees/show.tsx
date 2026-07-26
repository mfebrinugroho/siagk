import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Employee } from '@/types/employee';
import { Head, Link } from '@inertiajs/react';

interface Props {
    employee: Employee;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Karyawan',
        href: '/employees',
    },
    {
        title: 'Detail Data Karyawan',
        href: '/employees/show',
    },
];

const show = ({ employee }: Props) => {
    const headerColumns = [
        { key: 'name', label: 'Nama' },
        { key: 'position', label: 'Jabatan' },
        { key: 'gender', label: 'Jenis Kelamin' },
        { key: 'place_dob', label: 'Tempat, Tanggal Lahir' },
        { key: 'religion', label: 'Agama' },
        { key: 'education', label: 'Pendidikan Terakhir' },
        { key: 'address', label: 'Alamat' },
        { key: 'phone_number', label: 'Nomor HP' },
        { key: 'marital_status', label: 'Status Pernikahan' },
        { key: 'pay_date', label: 'Tanggal Gajian' },
        { key: 'salary', label: 'Gaji' },
        { key: 'days_off', label: 'Jatah Off' },
    ];

    const getValue = (key: string) => {
        switch (key) {
            case 'place_dob':
                return `${employee.pob}, ${employee.dob}`;

            case 'salary':
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                }).format(employee.salary);

            case 'gender':
                return employee.gender === 'male' ? 'Laki-laki' : 'Perempuan';

            case 'pay_date':
                return `${employee.pay_date} setiap bulan`;

            case 'days_off':
                return `${employee.days_off} Hari`;

            default:
                return employee[key as keyof typeof employee] ?? '-';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Data Karyawan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="border-sidebar-border/90 dark:border-sidebar-border mb-3 border-b">
                        <CardTitle>Detail Data Karyawan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                {headerColumns.map((column) => (
                                    <TableRow key={column.key}>
                                        <TableCell className="w-64 font-medium">{column.label}</TableCell>

                                        <TableCell>{getValue(column.key)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <Button size="lg" variant="outline" className="px-8 py-4" asChild>
                                <Link href={route('employees.index')}>Kembali</Link>
                            </Button>
                            <Button size="lg" className="px-8 py-4" asChild>
                                <Link href={route('employees.edit', employee.id)}>Ubah Data</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default show;
