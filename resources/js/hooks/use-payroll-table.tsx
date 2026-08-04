import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Props {
    tab: string;
    filters: {
        search: string;
        per_page: number;
    };
}

const usePayrollTable = ({ tab, filters }: Props) => {
    const [search, setSearch] = useState(filters.search ?? '');
    const [perPage, setPerPage] = useState(filters.per_page ?? 10);

    const fetchPayrolls = (params?: { search?: string; per_page?: number; tab?: string }) => {
        const query: Record<string, string | number> = {
            tab: params?.tab ?? tab,
        };

        const currentSearch = params?.search ?? search;
        const currentPerPage = params?.per_page ?? perPage;

        if (currentSearch.trim() !== '') {
            query.search = currentSearch;
        }

        if (currentPerPage !== 10) {
            query.per_page = currentPerPage;
        }

        router.get(route('payrolls.index'), query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchPayrolls({
                search,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const handleTabChange = (value: string) => {
        fetchPayrolls({
            tab: value,
        });
    };

    const handlePerPage = (value: number) => {
        setPerPage(value);

        fetchPayrolls({
            per_page: value,
        });
    };

    return {
        search,
        setSearch,
        perPage,
        setPerPage,
        fetchPayrolls,
        handleTabChange,
        handlePerPage,
    };
};

export default usePayrollTable;
