import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { RupiahCurrency } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { PayrollPaidForm } from '@/schemas/payroll-paid.schemas';
import { Payroll } from '@/types/payroll';
import { useForm } from '@inertiajs/react';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedOnprocessed: Payroll | null;
}

const ModalPaidOnprocessed = ({ open, setOpen, selectedOnprocessed }: Props) => {
    const form = useForm<PayrollPaidForm>({
        description: '',
    });

    const onprocessedColumns = [
        { key: 'name', label: 'Nama Karyawan' },
        { key: 'period', label: 'Periode' },
        { key: 'basic_salary', label: 'Gaji Pokok' },
        { key: 'total_bonus', label: 'Bonus' },
        { key: 'total_deduction', label: 'Potongan' },
        { key: 'net_salary', label: 'Gaji Bersih' },
        { key: 'status', label: 'Status' },
        { key: 'description', label: 'Keterangan' },
    ];

    const getValue = (key: string) => {
        if (!selectedOnprocessed) return '-';

        switch (key) {
            case 'name':
                return selectedOnprocessed.employee?.name;
            case 'period':
                return `${formatDate(selectedOnprocessed.period_start)} - ${formatDate(selectedOnprocessed.period_end)}`;
            case 'basic_salary':
                return `${RupiahCurrency(selectedOnprocessed.basic_salary)}`;
            case 'total_bonus':
                return `${RupiahCurrency(selectedOnprocessed.total_bonus)}`;
            case 'total_deduction':
                return `${RupiahCurrency(selectedOnprocessed.total_deduction)}`;
            case 'net_salary':
                return `${RupiahCurrency(selectedOnprocessed.net_salary)}`;
            case 'status':
                return 'Pending';
            case 'description':
                return (
                    <div className="space-y-1">
                        <Textarea value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />

                        {form.errors.description && <p className="text-destructive text-sm">{form.errors.description}</p>}
                    </div>
                );
        }
    };

    const handleSubmit = () => {
        if (!selectedOnprocessed) return;

        form.patch(route('payrolls.paid', selectedOnprocessed.id), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent size="lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Proses data penggajian karyawan berikut:</AlertDialogTitle>

                    <div className="mt-4 w-full text-left">
                        <Table>
                            <TableBody>
                                {onprocessedColumns.map((column) => (
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

                    <Button size="lg" onClick={handleSubmit} disabled={form.processing}>
                        {form.processing ? 'Memproses...' : 'Proses'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalPaidOnprocessed;
