import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, CalendarSearch, CircleDollarSign, LayoutGrid, Users } from 'lucide-react';
import AppLogo from './app-logo';

const dashboardNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

const mainNavItems: NavItem[] = [
    {
        title: 'Karyawan',
        url: '/employees',
        icon: Users,
    },

    {
        title: 'Absensi',
        url: '/attendances',
        icon: Calendar,
    },
    {
        title: 'Filter Absensi',
        url: '/filter-attendances',
        icon: CalendarSearch,
    },
    {
        title: 'Penggajian',
        url: '/payrolls?tab=unprocesseds',
        icon: CircleDollarSign,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain header="Platform" items={dashboardNavItems} />
                <NavMain header="Menu" items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
