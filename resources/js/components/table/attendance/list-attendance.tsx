import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RupiahCurrency } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { Attendance } from '@/types/attendance';
import { Link } from '@inertiajs/react';
import { Pen, Trash } from 'lucide-react';

interface Props {
    attendances: Attendance[];
    from: number;
    salary: number;
    summary: {
        total_surplus: number;
        total_minus: number;
        pay_total: number;
    };
    onDelete: (attendance: Attendance) => void;
    loading: boolean;
}

const ListAttendance = ({ attendances, from, salary, summary, onDelete, loading }: Props) => {
    const headerColumns = [
        { key: 'number', label: '#' },
        { key: 'description', label: 'Keterangan' },
        { key: 'date', label: 'Tanggal' },
        { key: 'amount', label: 'Nominal' },
        { key: 'action', label: 'Aksi' },
    ];

    const { total_surplus, total_minus, pay_total } = summary;

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
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={headerColumns.length} className="py-10">
                                <div className="flex items-center justify-center">
                                    <Spinner className="size-6" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : attendances.length > 0 ? (
                        attendances.map((attendance, index) => (
                            <TableRow key={attendance.id}>
                                <TableCell>{from + index}</TableCell>
                                <TableCell>{attendance.description}</TableCell>
                                <TableCell>{formatDate(attendance.date)}</TableCell>
                                <TableCell
                                    className={`${attendance.type === 'surplus' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}
                                >
                                    {attendance.type === 'surplus' ? '+' : '-'} {RupiahCurrency(attendance.amount)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex w-10 items-center justify-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            className="cursor-pointer bg-amber-500/60 dark:bg-amber-500/40"
                                            asChild
                                        >
                                            <Link href={route('attendances.edit', attendance.id)}>
                                                <Pen />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            className="cursor-pointer bg-red-500/60 dark:bg-red-500/40"
                                            onClick={() => onDelete(attendance)}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={headerColumns.length} className="text-muted-foreground h-24 text-center">
                                Tidak ada data absensi.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={headerColumns.length}>
                            <div className="ml-auto w-full max-w-md space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Gaji Pokok</span>
                                    <span>{RupiahCurrency(salary)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Bonus</span>
                                    <span className="text-emerald-600">+{RupiahCurrency(total_surplus)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Potongan</span>
                                    <span className="text-red-600">-{RupiahCurrency(total_minus)}</span>
                                </div>

                                <div className="border-t pt-2">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total Gaji</span>
                                        <span>{RupiahCurrency(pay_total)}</span>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
};

export default ListAttendance;
