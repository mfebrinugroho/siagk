import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RupiahCurrency } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { ResponsePagination } from '@/types';
import { Payroll } from '@/types/payroll';
import PaginationTable from '../pagination-table';
import PerPageInput from '../per-page-input';
import SearchInput from '../search-input';

interface Props {
    payrolls: ResponsePagination<Payroll>;
    tab: 'unprocesseds' | 'onprocesseds' | 'processeds';
    onGenerate?: (payroll: Payroll) => void;
    onDelOnprocess?: (payroll: Payroll) => void;
    onPaid?: (payroll: Payroll) => void;

    search: string;
    onSearch: (value: string) => void;
    perPage: number;
    onPerPage: (value: number) => void;
}

const ListPayroll = ({ payrolls, tab, onGenerate, onDelOnprocess, onPaid, search, onSearch, perPage, onPerPage }: Props) => {
    const { data, from, links } = payrolls;
    const headerColumns = [
        { key: 'number', label: '#' },
        { key: 'name', label: 'Nama Karyawan' },
        { key: 'period', label: 'Periode' },
        { key: 'total_bonus', label: 'Bonus' },
        { key: 'total_deduction', label: 'Potongan' },
        { key: 'net_salary', label: 'Gaji Bersih' },
        { key: 'action', label: 'Aksi' },
    ];

    const headerProcessedColumns = [
        { key: 'number', label: '#' },
        { key: 'name', label: 'Nama Karyawan' },
        { key: 'period', label: 'Periode' },
        { key: 'total_bonus', label: 'Bonus' },
        { key: 'total_deduction', label: 'Potongan' },
        { key: 'net_salary', label: 'Gaji Bersih' },
        { key: 'paid_at', label: 'Tanggal Bayar' },
        { key: 'action', label: 'Aksi' },
    ];

    const unprocessedPayrolls = data.filter((payroll) => payroll.can_generate);

    return (
        <>
            <div className="mb-4 flex w-full items-center justify-between">
                <PerPageInput value={perPage} onChange={onPerPage} />
                <SearchInput value={search} onChange={onSearch} />
            </div>
            <Table className="mb-4 overflow-x-auto rounded-md border">
                <TableHeader>
                    <TableRow>
                        {tab === 'processeds'
                            ? headerProcessedColumns.map((column) => <TableHead key={column.key}>{column.label}</TableHead>)
                            : headerColumns.map((column) => <TableHead key={column.key}>{column.label}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={headerColumns.length} className="text-muted-foreground py-8 text-center">
                                Tidak ada data penggajian.
                            </TableCell>
                        </TableRow>
                    )}

                    {tab === 'unprocesseds' &&
                        (unprocessedPayrolls.length > 0 ? (
                            unprocessedPayrolls.map((payroll, index) => (
                                <TableRow key={payroll.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{payroll.name}</TableCell>
                                    <TableCell>
                                        {formatDate(payroll.period_start)} - {formatDate(payroll.period_end)}
                                    </TableCell>
                                    <TableCell className="text-green-600 dark:text-green-500">{RupiahCurrency(payroll.total_bonus)}</TableCell>
                                    <TableCell className="text-red-600 dark:text-red-500">{RupiahCurrency(payroll.total_deduction)}</TableCell>
                                    <TableCell className="font-bold">{RupiahCurrency(payroll.net_salary)}</TableCell>
                                    <TableCell>
                                        {onGenerate && (
                                            <Button size="sm" className="cursor-pointer" onClick={() => onGenerate(payroll)}>
                                                Generate
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={headerColumns.length} className="text-muted-foreground py-8 text-center">
                                    Tidak ada data gajian hari ini.
                                </TableCell>
                            </TableRow>
                        ))}

                    {tab === 'processeds' &&
                        data.map((payroll, index) => (
                            <TableRow key={payroll.id}>
                                <TableCell>{from + index}</TableCell>
                                <TableCell>{payroll.employee?.name}</TableCell>
                                <TableCell>
                                    {formatDate(payroll.period_start)} - {formatDate(payroll.period_end)}
                                </TableCell>
                                <TableCell className="text-green-600 dark:text-green-500">{RupiahCurrency(payroll.total_bonus)}</TableCell>
                                <TableCell className="text-red-600 dark:text-red-500">{RupiahCurrency(payroll.total_deduction)}</TableCell>
                                <TableCell className="font-bold">{RupiahCurrency(payroll.net_salary)}</TableCell>
                                <TableCell>{formatDate(payroll.paid_at)}</TableCell>
                                <TableCell>
                                    <Button size="sm" className="cursor-pointer">
                                        Cetak Slip
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    {tab === 'onprocesseds' &&
                        data.map((payroll, index) => (
                            <TableRow key={payroll.id}>
                                <TableCell>{from + index}</TableCell>
                                <TableCell>{payroll.employee?.name}</TableCell>
                                <TableCell>
                                    {formatDate(payroll.period_start)} - {formatDate(payroll.period_end)}
                                </TableCell>
                                <TableCell className="text-green-600 dark:text-green-500">{RupiahCurrency(payroll.total_bonus)}</TableCell>
                                <TableCell className="text-red-600 dark:text-red-500">{RupiahCurrency(payroll.total_deduction)}</TableCell>
                                <TableCell className="font-bold">{RupiahCurrency(payroll.net_salary)}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="cursor-pointer" onClick={() => onDelOnprocess?.(payroll)}>
                                            Hapus
                                        </Button>
                                        <Button size="sm" className="cursor-pointer" onClick={() => onPaid?.(payroll)}>
                                            Bayar
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <PaginationTable links={links} />
        </>
    );
};

export default ListPayroll;
