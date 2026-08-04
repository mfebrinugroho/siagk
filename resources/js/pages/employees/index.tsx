import ListEmployee from '@/components/table/employee/list-employee';
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
import { BreadcrumbItem, ResponsePagination } from '@/types';
import { Employee } from '@/types/employee';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Karyawan',
        href: '/employees',
    },
];

type Props = {
    employees: ResponsePagination<Employee>;
    filters: {
        search?: string;
        per_page?: number;
    };
};

const Index = ({ employees, filters }: Props) => {
    const { data, links, from } = employees;
    const [openDel, setOpenDel] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [perPage, setPerPage] = useState(filters.per_page ?? 10);

    const fetchEmployees = (params: Partial<typeof filters> = {}) => {
        router.get(
            route('employees.index'),
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

    const handleOpenDelete = (employee: Employee) => {
        setSelectedEmployee(employee);
        setOpenDel(true);
    };

    const handleDelete = () => {
        if (!selectedEmployee) return;

        router.delete(route('employees.destroy', selectedEmployee.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenDel(false);
                setSelectedEmployee(null);
            },
        });
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Kelola Karyawan" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <Card>
                        <CardHeader className="border-sidebar-border/90 dark:border-sidebar-border mb-3 border-b">
                            <CardTitle>Data Karyawan</CardTitle>
                            <CardAction>
                                <Button size="lg" asChild>
                                    <Link href={route('employees.create')}>Tambah Data</Link>
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex w-full items-center justify-between">
                                <PerPageInput value={perPage} onChange={handlePerPage} />
                                <SearchInput value={search} onChange={setSearch} />
                            </div>
                            <ListEmployee employees={data} onDelete={handleOpenDelete} from={from} />
                            <PaginationTable links={links} />
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
                                Yakin ingin menghapus <strong>{selectedEmployee?.name}</strong>?
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
        </>
    );
};

export default Index;
