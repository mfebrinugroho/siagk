import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { payDate } from '@/lib/date';
import { Employee } from '@/types/employee';
import { Link } from '@inertiajs/react';
import { Eye, Pen, Trash } from 'lucide-react';

interface Props {
    employees: Employee[];
    onDelete: (employee: Employee) => void;
}

const ListEmployee = ({ employees, onDelete }: Props) => {
    const headerColumns = [
        { key: 'name', label: 'Nama' },
        { key: 'position', label: 'Jabatan' },
        { key: 'pay_date', label: 'Tgl Gajian' },
        { key: 'salary', label: 'Gaji' },
        { key: 'days_off', label: 'Jatah Off' },
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
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{payDate(employee.pay_date)}</TableCell>
                            <TableCell>{employee.salary_formatted}</TableCell>
                            <TableCell>{employee.days_off} Hari</TableCell>
                            <TableCell>
                                <div className="flex w-10 items-center justify-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        className="cursor-pointer bg-emerald-500/60 dark:bg-emerald-500/40"
                                        asChild
                                    >
                                        <Link href={route('employees.show', employee.id)}>
                                            <Eye />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon-sm" className="cursor-pointer bg-amber-500/60 dark:bg-amber-500/40" asChild>
                                        <Link href={route('employees.edit', employee.id)}>
                                            <Pen />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        className="cursor-pointer bg-red-500/60 dark:bg-red-500/40"
                                        onClick={() => onDelete(employee)}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default ListEmployee;
