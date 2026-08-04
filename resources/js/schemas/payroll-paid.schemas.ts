import { z } from 'zod';

export const payrollPaidSchema = z.object({
    description: z.string().min(1, 'Keterangan wajib diisi'),
});

export type PayrollPaidForm = z.infer<typeof payrollPaidSchema>;
