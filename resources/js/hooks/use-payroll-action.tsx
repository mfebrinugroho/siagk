import { Payroll } from '@/types/payroll';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const usePayrollAction = () => {
    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [openGenerate, setOpenGenerate] = useState(false);
    const [openDelOnprocess, setOpenDelOnprocess] = useState(false);
    const [openPaid, setOpenPaid] = useState(false);
    const [selectedUnprocessed, setSelectedUnprocessed] = useState<Payroll | null>(null);
    const [selectedOnprocessed, setSelectedOnprocessed] = useState<Payroll | null>(null);

    const handleOpenGenerate = (payroll: Payroll) => {
        setSelectedUnprocessed(payroll);
        setOpenGenerate(true);
    };

    const handleOpenDelOnprocess = (payroll: Payroll) => {
        setSelectedOnprocessed(payroll);
        setOpenDelOnprocess(true);
    };

    const handleOpenPaid = (payroll: Payroll) => {
        setSelectedOnprocessed(payroll);
        setOpenPaid(true);
    };

    const handleGenerate = () => {
        if (!selectedUnprocessed || loadingGenerate) return;

        router.post(
            route('payrolls.store'),
            {
                employee_id: selectedUnprocessed.id,
                period_start: selectedUnprocessed.period_start,
                period_end: selectedUnprocessed.period_end,
                basic_salary: selectedUnprocessed.basic_salary,
                total_bonus: selectedUnprocessed.total_bonus,
                total_deduction: selectedUnprocessed.total_deduction,
                net_salary: selectedUnprocessed.net_salary,
                status: 'pending',
            },
            {
                preserveScroll: true,
                onStart: () => setLoadingGenerate(true),
                onSuccess: () => {
                    setOpenGenerate(false);
                    setSelectedUnprocessed(null);

                    router.visit(route('payrolls.index'), {
                        data: {
                            tab: 'unprocesseds',
                        },
                        preserveScroll: true,
                    });
                },
                onFinish: () => setLoadingGenerate(false),
            },
        );
    };

    const handleDeleteOnprocess = () => {
        if (!selectedOnprocessed) return;

        router.delete(route('payrolls.destroy', selectedOnprocessed.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenDelOnprocess(false);
                setSelectedOnprocessed(null);
            },
        });
    };

    return {
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
    };
};

export default usePayrollAction;
