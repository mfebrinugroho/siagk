import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { EmployeeForm } from '@/schemas/employees.schemas';
import { Link, useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';

interface EmployeeFormProps {
    form: ReturnType<typeof useForm<EmployeeForm>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormEmployee = ({ form, onSubmit }: EmployeeFormProps) => {
    const [openDate, setOpenDate] = useState(false);

    return (
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={!!form.errors.name}>
                        <FieldLabel htmlFor="name">Nama</FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Nama"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            aria-invalid={!!form.errors.name}
                        />
                        {form.errors.name && <FieldError errors={[{ message: form.errors.name }]} />}
                    </Field>
                    <Field data-invalid={!!form.errors.gender}>
                        <FieldLabel htmlFor="gender">Jenis Kelamin</FieldLabel>
                        <Select value={form.data.gender} onValueChange={(value) => form.setData('gender', value)}>
                            <SelectTrigger aria-invalid={!!form.errors.gender} id="gender">
                                <SelectValue placeholder="Pilih Jenis Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="L">Laki - Laki</SelectItem>
                                <SelectItem value="P">Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                        {form.errors.gender && <FieldError errors={[{ message: form.errors.gender }]} />}
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={!!form.errors.pob}>
                        <FieldLabel htmlFor="pob">Tempat Lahir</FieldLabel>
                        <Input
                            id="pob"
                            type="text"
                            value={form.data.pob}
                            onChange={(e) => form.setData('pob', e.target.value)}
                            aria-invalid={!!form.errors.pob}
                            placeholder="Tempat Lahir"
                        />
                        {form.errors.pob && <FieldError errors={[{ message: form.errors.pob }]} />}
                    </Field>
                    <Field data-invalid={!!form.errors.dob}>
                        <FieldLabel htmlFor="dob">Tanggal Lahir</FieldLabel>
                        <Popover open={openDate} onOpenChange={setOpenDate}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" id="dob" className="justify-start font-normal">
                                    {form.data.dob ? (
                                        format(parseISO(form.data.dob), 'PPP')
                                    ) : (
                                        <span className="text-muted-foreground">Pilih tanggal lahir</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={form.data.dob ? parseISO(form.data.dob) : undefined}
                                    defaultMonth={form.data.dob ? parseISO(form.data.dob) : undefined}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        form.setData('dob', date ? format(date, 'yyyy-MM-dd') : '');
                                        setOpenDate(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>

                        {form.errors.dob && <FieldError errors={[{ message: form.errors.dob }]} />}
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={!!form.errors.religion}>
                        <FieldLabel htmlFor="religion">Agama</FieldLabel>
                        <Input
                            id="religion"
                            type="text"
                            value={form.data.religion}
                            onChange={(e) => form.setData('religion', e.target.value)}
                            aria-invalid={!!form.errors.religion}
                            placeholder="Agama"
                        />
                        {form.errors.religion && <FieldError errors={[{ message: form.errors.religion }]} />}
                    </Field>
                    <Field data-invalid={!!form.errors.education}>
                        <FieldLabel htmlFor="education">Pendidikan Terakhir</FieldLabel>
                        <Input
                            id="education"
                            type="text"
                            value={form.data.education}
                            onChange={(e) => form.setData('education', e.target.value)}
                            aria-invalid={!!form.errors.education}
                            placeholder="Pendidikan Terakhir"
                        />
                        {form.errors.education && <FieldError errors={[{ message: form.errors.education }]} />}
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={!!form.errors.address}>
                        <FieldLabel htmlFor="address">Alamat</FieldLabel>
                        <Textarea
                            id="address"
                            value={form.data.address}
                            onChange={(e) => form.setData('address', e.target.value)}
                            aria-invalid={!!form.errors.address}
                            placeholder="Alamat"
                        />
                        {form.errors.address && <FieldError errors={[{ message: form.errors.address }]} />}
                    </Field>
                    <Field data-invalid={!!form.errors.phone_number}>
                        <FieldLabel htmlFor="phone_number">Nomor HP</FieldLabel>
                        <Input
                            id="phone_number"
                            type="tel"
                            value={form.data.phone_number}
                            onChange={(e) => form.setData('phone_number', e.target.value)}
                            aria-invalid={!!form.errors.phone_number}
                            placeholder="+62 (555) 123-4567"
                        />
                        {form.errors.phone_number && <FieldError errors={[{ message: form.errors.phone_number }]} />}
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={!!form.errors.position}>
                        <FieldLabel htmlFor="position">Jabatan</FieldLabel>
                        <Input
                            id="position"
                            type="text"
                            value={form.data.position}
                            onChange={(e) => form.setData('position', e.target.value)}
                            aria-invalid={!!form.errors.position}
                            placeholder="Jabatan"
                        />
                        {form.errors.position && <FieldError errors={[{ message: form.errors.position }]} />}
                    </Field>
                    <Field data-invalid={!!form.errors.marital_status}>
                        <FieldLabel htmlFor="marital_status">Status Pernikahan</FieldLabel>
                        <Input
                            id="marital_status"
                            type="text"
                            value={form.data.marital_status}
                            onChange={(e) => form.setData('marital_status', e.target.value)}
                            aria-invalid={!!form.errors.marital_status}
                            placeholder="Status Pernikahan"
                        />
                        {form.errors.marital_status && <FieldError errors={[{ message: form.errors.marital_status }]} />}
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={!!form.errors.pay_date}>
                        <FieldLabel htmlFor="pay_date">Tanggal Gajian</FieldLabel>
                        <Input
                            id="pay_date"
                            type="text"
                            value={form.data.pay_date}
                            onChange={(e) => form.setData('pay_date', e.target.value)}
                            aria-invalid={!!form.errors.pay_date}
                            placeholder="Tanggal Gajian"
                        />
                        {form.errors.pay_date && <FieldError errors={[{ message: form.errors.pay_date }]} />}
                    </Field>
                    <Field data-invalid={!!form.errors.salary}>
                        <FieldLabel htmlFor="salary">Gaji</FieldLabel>
                        <Input
                            id="salary"
                            type="text"
                            value={form.data.salary}
                            onChange={(e) => form.setData('salary', e.target.value)}
                            aria-invalid={!!form.errors.salary}
                            placeholder="Gaji"
                        />
                        {form.errors.salary && <FieldError errors={[{ message: form.errors.salary }]} />}
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={!!form.errors.days_off}>
                        <FieldLabel htmlFor="days_off">Jatah Off</FieldLabel>
                        <Input
                            id="days_off"
                            type="text"
                            value={form.data.days_off}
                            onChange={(e) => form.setData('days_off', e.target.value)}
                            aria-invalid={!!form.errors.days_off}
                            placeholder="Jatah Off"
                        />
                        {form.errors.days_off && <FieldError errors={[{ message: form.errors.days_off }]} />}
                    </Field>
                </div>
            </FieldGroup>

            <div className="mt-4 flex items-center justify-center gap-4">
                <Button size="lg" variant="outline" className="px-8 py-4" asChild>
                    <Link href={route('employees.index')}>Kembali</Link>
                </Button>
                <Button type="submit" size="lg" className="cursor-pointer px-8 py-4" disabled={form.processing}>
                    {form.processing && <Spinner data-icon="inline-start" className="text-center" />}
                    {form.processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </div>
        </form>
    );
};

export default FormEmployee;
