import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RupiahCurrency } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { PayrollUnprocessed } from '@/types/payroll';

interface Props {
    unprocesseds: PayrollUnprocessed[];
    from: number;
    onGenerate: (unprocessed: PayrollUnprocessed) => void;
}

const ListPayrollUnprocessed = ({ unprocesseds, from, onGenerate }: Props) => {
    const headerColumns = [
        { key: 'number', label: '#' },
        { key: 'name', label: 'Nama Karyawan' },
        { key: 'period', label: 'Periode' },
        { key: 'total_bonus', label: 'Bonus' },
        { key: 'total_deduction', label: 'Potongan' },
        { key: 'net_salary', label: 'Gaji Bersih' },
        { key: 'action', label: 'Aksi' },
    ];

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {headerColumns.map((column) => (
                            <TableHead key={column.key}>{column.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {unprocesseds.map((unprocessed, index) => (
                        <TableRow key={unprocessed.id}>
                            <TableCell>{from + index}</TableCell>
                            <TableCell>{unprocessed.name}</TableCell>
                            <TableCell>
                                {formatDate(unprocessed.period_start)} - {formatDate(unprocessed.period_end)}
                            </TableCell>
                            <TableCell className="text-green-600 dark:text-green-500">{RupiahCurrency(unprocessed.total_bonus)}</TableCell>
                            <TableCell className="text-red-600 dark:text-red-500">{RupiahCurrency(unprocessed.total_deduction)}</TableCell>
                            <TableCell className="font-bold">{RupiahCurrency(unprocessed.net_salary)}</TableCell>
                            <TableCell>
                                <Button
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => onGenerate(unprocessed)}
                                    disabled={!unprocessed.can_generate}
                                >
                                    Generate
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default ListPayrollUnprocessed;
