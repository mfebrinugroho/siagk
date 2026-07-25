import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { payDate } from '@/lib/date';
import { Employee } from '@/types/employee';

interface Props {
    employees: Employee[];
}

const ListEmployee = ({ employees }: Props) => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Jabatan</TableHead>
                        <TableHead>Tgl Gajian</TableHead>
                        <TableHead>Gaji</TableHead>
                        <TableHead>Jatah Off</TableHead>
                        <TableHead>Aksi</TableHead>
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
                            <TableCell>Aksi</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default ListEmployee;
