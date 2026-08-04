import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RupiahCurrency } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { PayrollProcesseed } from '@/types/payroll';

interface Props {
    processeds: PayrollProcesseed[];
    from: number;
}

const ListPayrollProcessed = ({ processeds, from }: Props) => {
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
                {processeds.map((processed, index) => (
                    <TableRow key={processed.id}>
                        <TableCell>{from + index}</TableCell>
                        <TableCell>{processed.employee.name}</TableCell>
                        <TableCell>
                            {formatDate(processed.period_start)} - {formatDate(processed.period_end)}
                        </TableCell>
                        <TableCell className="text-green-600 dark:text-green-500">{RupiahCurrency(processed.total_bonus)}</TableCell>
                        <TableCell className="text-red-600 dark:text-red-500">{RupiahCurrency(processed.total_deduction)}</TableCell>
                        <TableCell className="font-bold">{RupiahCurrency(processed.net_salary)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ListPayrollProcessed;
