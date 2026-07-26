import { z } from 'zod';

export const employeeSchema = z.object({
    name: z.string().min(3, 'Nama minimal 3 karakter'),
    gender: z.string().optional(),
    pob: z.string().optional(),
    dob: z.string().optional(),
    religion: z.string().optional(),
    education: z.string().optional(),
    address: z.string().optional(),
    phone_number: z.string().min(11, 'Nomor HP minimal 11 digit'),
    position: z.string().min(3, 'Jabatan minimal 3 karakter'),
    marital_status: z.string().optional(),
    pay_date: z.coerce.number().min(1, 'Tanggal gajian wajib diisi'),
    salary: z.coerce.number().min(1, 'Gaji wajib diisi'),
    days_off: z.coerce.number().optional(),
});

export type Employee = z.infer<typeof employeeSchema>;

export type EmployeeForm = Omit<Employee, 'pay_date' | 'salary' | 'days_off'> & {
    pay_date: string;
    salary: string;
    days_off: string;
};
