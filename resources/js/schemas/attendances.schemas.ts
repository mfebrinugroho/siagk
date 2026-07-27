import { z } from 'zod';

export const attendanceSchema = z.object({
    employee_id: z.coerce.number().min(1, 'Karyawan wajib diisi'),
    name: z.string().optional(),
    position: z.string().optional(),
    date: z.string().min(1, 'Tanggal wajib diisi'),
    description: z.string().min(1, 'Keterangan wajib diisi'),
    type: z.string().min(1, 'Jenis wajib diisi'),
    amount: z.coerce.number().min(1, 'Nominal wajib diisi'),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
});

export type Attendance = z.infer<typeof attendanceSchema>;

export type AttendanceForm = Omit<Attendance, 'amount'> & {
    // employee_id: string;
    amount: string;
};
