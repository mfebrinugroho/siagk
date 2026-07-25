import ListEmployee from '@/components/table/employee/list-employee';
import PaginationTable from '@/components/table/pagination-table';
import PerPageInput from '@/components/table/per-page-input';
import SearchInput from '@/components/table/search-input';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ResponsePagination } from '@/types';
import { Employee } from '@/types/employee';
import { Head, Link, router } from '@inertiajs/react';
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
        search: string;
    };
};

const Index = ({ employees, filters }: Props) => {
    const [search, setSearch] = useState(filters.search ?? '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params: Record<string, string | number> = {};

            if (search.trim()) {
                params.search = search;
            }

            router.get(route('employees.index'), params, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

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
                                <PerPageInput />
                                <SearchInput value={search} onChange={setSearch} />
                            </div>
                            <ListEmployee employees={employees.data} />
                            <PaginationTable links={employees.links} />
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </>
    );
};

export default Index;
