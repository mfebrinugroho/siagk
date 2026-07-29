import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Penggajian',
        href: '/payrolls',
    },
];

const tabsTriggerColor =
    'data-[state=active]:text-primary dark:data-[state=active]:text-primary data-[state=active]:bg-card data-[state=active]:border-primary/20';

const Index = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Penggajian" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs defaultValue="overview" className="w-[full] flex-col">
                    <TabsList className="bg-sidebar/70 dark:bg-sidebar gap-2">
                        <TabsTrigger value="overview" className={`px-6 py-2 ${tabsTriggerColor}`}>
                            Belum Diproses
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className={`px-6 py-2 ${tabsTriggerColor}`}>
                            Sedang Diproses
                        </TabsTrigger>
                        <TabsTrigger value="reports" className={`px-6 py-2 ${tabsTriggerColor}`}>
                            Sudah Diproses
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>
                                    View your key metrics and recent project activity. Track progress across all your active projects.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-muted-foreground text-sm">You have 12 active projects and 3 pending tasks.</CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="analytics">
                        <Card>
                            <CardHeader>
                                <CardTitle>Analytics</CardTitle>
                                <CardDescription>
                                    Track performance and user engagement metrics. Monitor trends and identify growth opportunities.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-muted-foreground text-sm">Page views are up 25% compared to last month.</CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="reports">
                        <Card>
                            <CardHeader>
                                <CardTitle>Reports</CardTitle>
                                <CardDescription>
                                    Generate and download your detailed reports. Export data in multiple formats for analysis.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-muted-foreground text-sm">You have 5 reports ready and available to export.</CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
};

export default Index;
