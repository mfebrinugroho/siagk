import SearchSelect from '@/components/input/search-select';
import ListFilterAttendance from '@/components/table/filter-attendance/list-filter-attendance';
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
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/date';
import { BreadcrumbItem, ResponsePagination } from '@/types';
import { Attendance } from '@/types/attendance';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

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
        start_date?: string;
        end_date?: string;
        search?: string;
        per_page?: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Filter Data Absensi',
        href: '/filter-attendances',
    },
];

const Index = ({ attendances, employees, start_date, end_date, summary, filters }: Props) => {
    const { data, links, from } = attendances;
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeProps | null>(employees.find((e) => e.id === filters.employee_id) ?? null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [perPage, setPerPage] = useState(filters.per_page ?? 10);
    const [loading, setLoading] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);

    const [openDate, setOpenDate] = useState(false);
    const [range, setRange] = useState<DateRange>({
        from: filters.start_date ? new Date(filters.start_date) : undefined,
        to: filters.end_date ? new Date(filters.end_date) : undefined,
    });
    const isFiltered = !!filters.employee_id && !!filters.start_date && !!filters.end_date;

    const query = {
        employee_id: filters.employee_id,
        start_date: filters.start_date,
        end_date: filters.end_date,
    };

    const fetchAttendances = (params: Partial<typeof filters> = {}) => {
        router.get(
            route('filter-attendances.index'),
            {
                ...((params.employee_id ?? selectedEmployee?.id) ? { employee_id: params.employee_id ?? selectedEmployee?.id } : {}),
                ...(params.start_date && { start_date: params.start_date }),
                ...(params.end_date && { end_date: params.end_date }),
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchAttendances({
                search,
                start_date: range?.from ? format(range.from, 'yyyy-MM-dd') : filters.start_date,
                end_date: range?.to ? format(range.to, 'yyyy-MM-dd') : filters.end_date,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const handleEmployeeChange = (employee: EmployeeProps | null) => {
        setSelectedEmployee(employee);
    };

    const handleFilter = () => {
        if (!selectedEmployee) {
            return;
        }

        if (!range?.from || !range?.to) {
            return;
        }

        fetchAttendances({
            employee_id: selectedEmployee.id,
            start_date: format(range.from, 'yyyy-MM-dd'),
            end_date: format(range.to, 'yyyy-MM-dd'),
        });
    };

    const handlePerPage = (value: number) => {
        setPerPage(value);

        fetchAttendances({
            per_page: value,
        });
    };

    const handleOpenDelete = (attendance: Attendance) => {
        setSelectedAttendance(attendance);
        setOpenDel(true);
    };

    const handleDelete = () => {
        if (!selectedAttendance) return;

        router.delete(route('filter-attendances.destroy', selectedAttendance.id), {
            data: {
                ...query,
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
            <Head title="Kelola Filter Absensi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <SearchSelect
                                options={employees}
                                value={selectedEmployee}
                                onChange={handleEmployeeChange}
                                getLabel={(employee) => employee.name}
                                getValue={(employee) => employee.id.toString()}
                                placeholder="Pilih Karyawan"
                                searchPlaceholder="Cari karyawan..."
                            />

                            <Field>
                                {/* <FieldLabel>Tanggal Awal</FieldLabel> */}

                                <Popover open={openDate} onOpenChange={setOpenDate}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="p-5">
                                            {range?.from
                                                ? range.to
                                                    ? `${format(range.from, 'dd/MM/yyyy')} - ${format(range.to, 'dd/MM/yyyy')}`
                                                    : format(range.from, 'dd/MM/yyyy')
                                                : 'Pilih rentang tanggal'}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
                                    </PopoverContent>
                                </Popover>
                            </Field>
                            <Button onClick={handleFilter} className="p-5">
                                Filter Absensi
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="border-sidebar-border/90 dark:border-sidebar-border mb-3 border-b">
                        <CardTitle>Filter Data Absensi</CardTitle>
                        {isFiltered && (
                            <CardAction>
                                <Button size="lg" asChild>
                                    <Link href={route('filter-attendances.create', query)}>Tambah Data</Link>
                                </Button>
                            </CardAction>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-6 pb-4">
                        {isFiltered ? (
                            <>
                                <div className="grid gap-3 rounded-lg border p-4 md:grid-cols-3">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Nama Karyawan</p>
                                        <p className="font-medium">
                                            {selectedEmployee?.name} ( Tanggal {selectedEmployee?.pay_date} )
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground text-sm">Jabatan</p>
                                        <p className="font-medium">{selectedEmployee?.position}</p>
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

                                <ListFilterAttendance
                                    attendances={data}
                                    from={from}
                                    salary={selectedEmployee?.salary}
                                    summary={summary}
                                    onDelete={handleOpenDelete}
                                    loading={loading}
                                    query={query}
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
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Data</AlertDialogTitle>

                        <AlertDialogDescription>
                            Yakin ingin menghapus <strong>{selectedAttendance?.description}</strong>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>

                        <AlertDialogAction onClick={handleDelete} className="cursor-pointer">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
};

export default Index;
