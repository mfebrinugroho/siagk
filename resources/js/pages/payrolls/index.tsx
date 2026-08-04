import ModalDeleteOnprocess from '@/components/modal/payroll/modal-delete-onprocess';
import ModalGenerateUnprocess from '@/components/modal/payroll/modal-generate-unprocess';
import ModalPaidOnprocessed from '@/components/modal/payroll/modal-paid-onporcessed';
import ListPayroll from '@/components/table/payroll/list-payroll';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import usePayrollAction from '@/hooks/use-payroll-action';
import usePayrollTable from '@/hooks/use-payroll-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ResponsePagination } from '@/types';
import { Payroll } from '@/types/payroll';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Penggajian',
        href: '/payrolls',
    },
];

interface Props {
    tab: 'unprocesseds' | 'onprocesseds' | 'processeds';
    filters: {
        search: string;
        per_page: number;
    };
    payrolls: ResponsePagination<Payroll>;
}

const Index = ({ tab, filters, payrolls }: Props) => {
    const { search, setSearch, perPage, handleTabChange, handlePerPage } = usePayrollTable({ tab, filters });
    const {
        loadingGenerate,
        openGenerate,
        setOpenGenerate,
        openDelOnprocess,
        setOpenDelOnprocess,
        selectedUnprocessed,
        selectedOnprocessed,
        handleOpenGenerate,
        handleOpenDelOnprocess,
        handleGenerate,
        handleDeleteOnprocess,
        openPaid,
        setOpenPaid,
        handleOpenPaid,
    } = usePayrollAction();

    const tabsTriggerColor =
        'data-[state=active]:text-primary dark:data-[state=active]:text-primary data-[state=active]:bg-card data-[state=active]:border-primary/20';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Penggajian" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs value={tab} onValueChange={handleTabChange} className="w-[full] flex-col">
                    <TabsList className="bg-sidebar/70 dark:bg-sidebar gap-2">
                        <TabsTrigger value="unprocesseds" className={`px-6 py-2 ${tabsTriggerColor}`}>
                            Belum Diproses
                        </TabsTrigger>
                        <TabsTrigger value="onprocesseds" className={`px-6 py-2 ${tabsTriggerColor}`}>
                            Sedang Diproses
                        </TabsTrigger>
                        <TabsTrigger value="processeds" className={`px-6 py-2 ${tabsTriggerColor}`}>
                            Sudah Diproses
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="unprocesseds">
                        <Card>
                            <CardHeader>
                                <CardTitle>Penggajian Belum Diproses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ListPayroll
                                    payrolls={payrolls}
                                    tab={tab}
                                    onGenerate={handleOpenGenerate}
                                    search={search}
                                    onSearch={setSearch}
                                    perPage={perPage}
                                    onPerPage={handlePerPage}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="onprocesseds">
                        <Card>
                            <CardHeader>
                                <CardTitle>Penggajian Sedang Diproses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ListPayroll
                                    payrolls={payrolls}
                                    tab={tab}
                                    onDelOnprocess={handleOpenDelOnprocess}
                                    search={search}
                                    onSearch={setSearch}
                                    perPage={perPage}
                                    onPerPage={handlePerPage}
                                    onPaid={handleOpenPaid}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="processeds">
                        <Card>
                            <CardHeader>
                                <CardTitle>Penggajian Sudah Diproses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ListPayroll
                                    payrolls={payrolls}
                                    tab={tab}
                                    search={search}
                                    onSearch={setSearch}
                                    perPage={perPage}
                                    onPerPage={handlePerPage}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <ModalGenerateUnprocess
                open={openGenerate}
                setOpen={setOpenGenerate}
                selectedUnprocessed={selectedUnprocessed}
                handleGenerate={handleGenerate}
                loadingGenerate={loadingGenerate}
            />

            <ModalDeleteOnprocess
                openDelOnprocess={openDelOnprocess}
                setOpenDelOnprocess={setOpenDelOnprocess}
                selectedName={selectedOnprocessed?.employee?.name}
                handleDeleteOnprocess={handleDeleteOnprocess}
            />

            <ModalPaidOnprocessed open={openPaid} setOpen={setOpenPaid} selectedOnprocessed={selectedOnprocessed} />
        </AppLayout>
    );
};

export default Index;
