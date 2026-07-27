import { AttendanceForm, attendanceSchema } from '@/schemas/attendances.schemas';
import { Attendance } from '@/types/attendance';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import FormFilterAttendance from './form-filter-attendance';

interface Props {
    attendance: Attendance;
    query: {
        employee_id: number;
        start_date: string;
        end_date: string;
    };
}
const EditFilterAttendanceForm = ({ attendance, query }: Props) => {
    const form = useForm<AttendanceForm>({
        employee_id: attendance.employee_id,
        name: attendance.employee?.name,
        position: attendance.employee?.position,
        date: attendance.date,
        description: attendance.description,
        type: attendance.type,
        amount: attendance.amount.toString(),
        start_date: query.start_date,
        end_date: query.end_date,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = attendanceSchema.safeParse(form.data);

        if (!result.success) {
            form.clearErrors();

            const errors = result.error.flatten().fieldErrors;

            Object.entries(errors).forEach(([field, messages]) => {
                if (messages?.length) {
                    form.setError(field as keyof AttendanceForm, messages[0]);
                }
            });

            return;
        }

        form.put(route('filter-attendances.update', attendance.id));
    };

    return <FormFilterAttendance form={form} onSubmit={handleSubmit} query={query} />;
};

export default EditFilterAttendanceForm;
