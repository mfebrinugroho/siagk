import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { appLogo } = usePage<SharedData>().props;
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-md">
                <img src={appLogo} alt="Logo" className="w-44" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-xl">
                <span className="mb-0.5 truncate leading-none font-semibold">PJK</span>
            </div>
        </>
    );
}
