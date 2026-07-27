import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { AttendanceForm } from '@/schemas/attendances.schemas';
import { Link, useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';

interface AttendanceFormProps {
    form: ReturnType<typeof useForm<AttendanceForm>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormAttendance = ({ form, onSubmit }: AttendanceFormProps) => {
    const [openDate, setOpenDate] = useState(false);

    return (
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <div>
                    <Field data-invalid={!!form.errors.employee_id}>
                        <FieldLabel htmlFor="name">Nama</FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Nama"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            aria-invalid={!!form.errors.employee_id}
                            readOnly
                        />
                        <Input
                            id="employee_id"
                            type="text"
                            placeholder="Nama"
                            value={form.data.employee_id}
                            onChange={(e) => form.setData('employee_id', Number(e.target.value))}
                            aria-invalid={!!form.errors.employee_id}
                            hidden
                        />
                        {form.errors.employee_id && <FieldError errors={[{ message: form.errors.employee_id }]} />}
                    </Field>
                </div>
                <div>
                    <Field data-invalid={!!form.errors.position}>
                        <FieldLabel htmlFor="name">Nama</FieldLabel>
                        <Input
                            id="position"
                            type="text"
                            placeholder="Nama"
                            value={form.data.position}
                            onChange={(e) => form.setData('position', e.target.value)}
                            aria-invalid={!!form.errors.position}
                            readOnly
                        />
                        {form.errors.position && <FieldError errors={[{ message: form.errors.position }]} />}
                    </Field>
                </div>
                <div>
                    <Field data-invalid={!!form.errors.date}>
                        <FieldLabel htmlFor="date">Tanggal</FieldLabel>
                        <Popover open={openDate} onOpenChange={setOpenDate}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" id="date" className="justify-start font-normal">
                                    {form.data.date ? (
                                        format(parseISO(form.data.date), 'PPP')
                                    ) : (
                                        <span className="text-muted-foreground">Pilih tanggal</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={form.data.date ? parseISO(form.data.date) : undefined}
                                    defaultMonth={form.data.date ? parseISO(form.data.date) : undefined}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        form.setData('date', date ? format(date, 'yyyy-MM-dd') : '');
                                        setOpenDate(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>

                        {form.errors.date && <FieldError errors={[{ message: form.errors.date }]} />}
                    </Field>
                </div>
                <div>
                    <Field data-invalid={!!form.errors.description}>
                        <FieldLabel htmlFor="description">Keterangan</FieldLabel>
                        <Textarea
                            id="description"
                            value={form.data.description}
                            onChange={(e) => form.setData('description', e.target.value)}
                            aria-invalid={!!form.errors.description}
                            placeholder="Keterangan"
                        />
                        {form.errors.description && <FieldError errors={[{ message: form.errors.description }]} />}
                    </Field>
                </div>
                <div>
                    <Field data-invalid={!!form.errors.type}>
                        <FieldLabel htmlFor="type">Jenis</FieldLabel>
                        <Select value={form.data.type} onValueChange={(value) => form.setData('type', value)}>
                            <SelectTrigger aria-invalid={!!form.errors.type} id="type">
                                <SelectValue placeholder="Pilih Jenis" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="surplus">Surplus</SelectItem>
                                <SelectItem value="minus">Minus</SelectItem>
                            </SelectContent>
                        </Select>
                        {form.errors.type && <FieldError errors={[{ message: form.errors.type }]} />}
                    </Field>
                </div>
                <div>
                    <Field data-invalid={!!form.errors.amount}>
                        <FieldLabel htmlFor="amount">Nominal</FieldLabel>
                        <Input
                            id="amount"
                            type="text"
                            value={new Intl.NumberFormat('id-ID').format(Number(form.data.amount || 0))}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');

                                form.setData('amount', value);
                            }}
                            aria-invalid={!!form.errors.amount}
                            placeholder="0"
                        />
                        {form.errors.amount && <FieldError errors={[{ message: form.errors.amount }]} />}
                    </Field>
                </div>
            </FieldGroup>
            <div className="mt-4 flex items-center justify-center gap-4">
                <Button size="lg" variant="outline" className="px-8 py-4" asChild>
                    <Link href={route('attendances.index')}>Kembali</Link>
                </Button>
                <Button type="submit" size="lg" className="cursor-pointer px-8 py-4" disabled={form.processing}>
                    {form.processing && <Spinner data-icon="inline-start" className="text-center" />}
                    {form.processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </div>
        </form>
    );
};

export default FormAttendance;
