import AppearanceHeader from '@/components/appearance-header';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function AppSidebarHeader() {
    const { today } = usePage<SharedData>().props;
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 cursor-pointer" />
                    {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
                    <p className="text-sm">Tanggal Hari Ini : {today}</p>
                </div>

                <AppearanceHeader />
            </div>
        </header>
    );
}
