import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RupiahCurrency } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { PayrollProcesseed } from '@/types/payroll';

interface Props {
    onprocesseds: PayrollProcesseed[];
    from: number;
}

const ListPayrollOnprocessed = ({ onprocesseds, from }: Props) => {
    const headerColumns = [
        { key: 'number', label: '#' },
        { key: 'name', label: 'Nama Karyawan' },
        { key: 'period', label: 'Periode' },
        { key: 'total_bonus', label: 'Bonus' },
        { key: 'total_deduction', label: 'Potongan' },
        { key: 'net_salary', label: 'Gaji Bersih' },
    ];

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {headerColumns.map((column) => (
                        <TableHead key={column.key}>{column.label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {onprocesseds.map((onprocessed, index) => (
                    <TableRow key={onprocessed.id}>
                        <TableCell>{from + index}</TableCell>
                        <TableCell>{onprocessed.employee.name}</TableCell>
                        <TableCell>
                            {formatDate(onprocessed.period_start)} - {formatDate(onprocessed.period_end)}
                        </TableCell>
                        <TableCell className="text-green-600 dark:text-green-500">{RupiahCurrency(onprocessed.total_bonus)}</TableCell>
                        <TableCell className="text-red-600 dark:text-red-500">{RupiahCurrency(onprocessed.total_deduction)}</TableCell>
                        <TableCell className="font-bold">{RupiahCurrency(onprocessed.net_salary)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ListPayrollOnprocessed;
