import SearchSelect from '@/components/input/search-select';
import ListAttendance from '@/components/table/attendance/list-attendance';
import PaginationTable from '@/components/table/pagination-table';
import PerPageInput from '@/components/table/per-page-input';
import SearchInput from '@/components/table/search-input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/date';
import { BreadcrumbItem, ResponsePagination } from '@/types';
import { Attendance } from '@/types/attendance';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EmployeeProps {
    id: number;
    name: string;
    position: string;
    pay_date: number;
    salary: number;
}

interface Props {
    attendances: ResponsePagination<Attendance>;
    employees: EmployeeProps[];
    start_date: string;
    end_date: string;
    summary: {
        total_surplus: number;
        total_minus: number;
        pay_total: number;
    };
    filters: {
        employee_id?: number;
        search?: string;
        per_page?: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Absensi',
        href: '/attendances',
    },
];

const Index = ({ attendances, employees, start_date, end_date, summary, filters }: Props) => {
    // console.log(attendances);
    const { data, links, from } = attendances;
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeProps | null>(employees.find((e) => e.id === filters.employee_id) ?? null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [perPage, setPerPage] = useState(filters.per_page ?? 10);
    const [loading, setLoading] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);

    const queryParams = {
        employee_id: selectedEmployee?.id,
        search,
        per_page: perPage,
    };

    const fetchAttendances = (params: Partial<typeof filters> = {}) => {
        router.get(
            route('attendances.index'),
            {
                ...((params.employee_id ?? selectedEmployee?.id) ? { employee_id: params.employee_id ?? selectedEmployee?.id } : {}),
                ...(params.search ? { search: params.search } : {}),
                ...(params.per_page && params.per_page !== 10 ? { per_page: params.per_page } : {}),
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            },
        );
    };

    const handleEmployeeChange = (employee: EmployeeProps) => {
        setSelectedEmployee(employee);

        fetchAttendances({
            ...queryParams,
            employee_id: employee.id,
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchAttendances({
                ...queryParams,
                search,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const handlePerPage = (value: number) => {
        setPerPage(value);

        fetchAttendances({
            ...queryParams,
            per_page: value,
        });
    };

    const handleOpenDelete = (attendance: Attendance) => {
        setSelectedAttendance(attendance);
        setOpenDel(true);
    };

    const handleDelete = () => {
        if (!selectedAttendance) return;

        router.delete(route('attendances.destroy', selectedAttendance.id), {
            data: {
                employee_id: filters.employee_id,
            },
            preserveScroll: true,
            onSuccess: () => {
                setOpenDel(false);
                setSelectedAttendance(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Absensi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <SearchSelect
                    options={employees}
                    value={selectedEmployee}
                    onChange={handleEmployeeChange}
                    getLabel={(employee) => employee.name}
                    getValue={(employee) => employee.id.toString()}
                    placeholder="Pilih Karyawan"
                    searchPlaceholder="Cari karyawan..."
                />
                <Card>
                    <CardHeader className="border-sidebar-border/90 dark:border-sidebar-border mb-3 border-b">
                        <CardTitle>Data Absensi</CardTitle>
                        {selectedEmployee && (
                            <CardAction>
                                <Button size="lg" asChild>
                                    <Link
                                        href={route('attendances.create', {
                                            employee_id: selectedEmployee?.id,
                                        })}
                                    >
                                        Tambah Data
                                    </Link>
                                </Button>
                            </CardAction>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-6 pb-4">
                        {selectedEmployee ? (
                            <>
                                <div className="grid gap-3 rounded-lg border p-4 md:grid-cols-3">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Nama Karyawan</p>
                                        <p className="font-medium">
                                            {selectedEmployee.name} ( Tanggal {selectedEmployee.pay_date} )
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground text-sm">Jabatan</p>
                                        <p className="font-medium">{selectedEmployee.position}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground text-sm">Periode Gaji</p>
                                        <p className="font-medium">
                                            {formatDate(start_date)} - {formatDate(end_date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-between">
                                    <PerPageInput value={perPage} onChange={handlePerPage} />
                                    <SearchInput value={search} onChange={setSearch} />
                                </div>

                                <ListAttendance
                                    attendances={data}
                                    from={from}
                                    salary={selectedEmployee.salary}
                                    summary={summary}
                                    onDelete={handleOpenDelete}
                                    loading={loading}
                                />

                                <PaginationTable links={links} />
                            </>
                        ) : (
                            <h1 className="text-muted-foreground text-center">Silahkan pilih karyawan terlebih dahulu.</h1>
                        )}
                    </CardContent>
                </Card>
            </div>

            <AlertDialog open={openDel} onOpenChange={setOpenDel}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus <strong>{selectedAttendance?.description}</strong>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline" className="cursor-pointer">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={handleDelete}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
};

export default Index;
