import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { RupiahCurrency } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { Payroll } from '@/types/payroll';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedUnprocessed: Payroll | null;
    handleGenerate: () => void;
    loadingGenerate: boolean;
}

const ModalGenerateUnprocess = ({ open, setOpen, selectedUnprocessed, handleGenerate, loadingGenerate }: Props) => {
    const unprocessedColumns = [
        { key: 'name', label: 'Nama Karyawan' },
        { key: 'period', label: 'Periode' },
        { key: 'basic_salary', label: 'Gaji Pokok' },
        { key: 'total_bonus', label: 'Bonus' },
        { key: 'total_deduction', label: 'Potongan' },
        { key: 'net_salary', label: 'Gaji Bersih' },
        { key: 'status', label: 'Status' },
    ];

    const getValue = (key: string) => {
        if (!selectedUnprocessed) return '-';

        switch (key) {
            case 'name':
                return selectedUnprocessed.name;
            case 'period':
                return `${formatDate(selectedUnprocessed.period_start)} - ${formatDate(selectedUnprocessed.period_end)}`;
            case 'basic_salary':
                return `${RupiahCurrency(selectedUnprocessed.basic_salary)}`;
            case 'total_bonus':
                return `${RupiahCurrency(selectedUnprocessed.total_bonus)}`;
            case 'total_deduction':
                return `${RupiahCurrency(selectedUnprocessed.total_deduction)}`;
            case 'net_salary':
                return `${RupiahCurrency(selectedUnprocessed.net_salary)}`;
            case 'status':
                return 'Belum Diproses';
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent size="lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Proses data penggajian karyawan berikut:</AlertDialogTitle>

                    <div className="mt-4 w-full text-left">
                        <Table>
                            <TableBody>
                                {unprocessedColumns.map((column) => (
                                    <TableRow key={column.key}>
                                        <TableCell className="max-w-full font-medium">{column.label}</TableCell>

                                        <TableCell>{getValue(column.key)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel size="lg" className="cursor-pointer">
                        Batal
                    </AlertDialogCancel>

                    <AlertDialogAction size="lg" onClick={handleGenerate} disabled={loadingGenerate} className="cursor-pointer">
                        {loadingGenerate ? 'Memproses...' : 'Proses'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalGenerateUnprocess;
